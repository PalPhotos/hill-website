import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Modal, Button, Image, Input, Spin, Upload } from "antd";
import { ReactPictureAnnotation } from "react-picture-annotation";
import Firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AdminActions, UserActions } from "../../redux/actions";
import axios from "axios";
import { SERVER_URI } from "../../constants/server";

import "./styles.css";

const ImportPhotosScreen = (props) => {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [imageMeta, setImageMeta] = useState([]);
  const [loadingModal, setloadingModal] = useState(false);
  const [nexpage, setNext] = useState("");
  const [drive, setDrive] = useState(
    "https://drive.google.com/drive/u/0/folders/1CaqF4Q-hgxyNeIwm9_4GnGzpe6263MG-"
  );
  let storageRef = Firebase.storage().ref();
  const history = useHistory();
  const [link, setlink] = useState("");

  useEffect(() => {
    if (link.length > 0 && nexpage.length > 0 && !props.admin.loading) {
      console.log("look cl");
      getdata(link);
    }
  }, [props.admin.loading]);

  useEffect(() => {
    if (nexpage.length > 0) {
      console.log("hmm");
      getdataPhotos(nexpage);
    }
  }, [nexpage]);

  const getdata = async (folderId) => {
    setloadingModal(true);
    let authToken = props.user.token;
    try {
      let expiryTime = new Date(props.user.expiry);
      let current = new Date();
      if (expiryTime < current) {
        let res = await axios.post(`${SERVER_URI}/user/refresh`, {
          _id: props.user._id,
        });
        props.setUser(res.data.user);
        authToken = res.data.user.token;
      }
      let driveFiles = await axios.get(
        "https://www.googleapis.com/drive/v3/files",

        {
          params: {
            corpora: "user",
            fields:
              "files(id,name,webViewLink,imageMediaMetadata),nextPageToken",
            q: `'${folderId}' in parents and trashed = false and mimeType = \'image/jpeg\'`,
            pageSize: 100,
            pageToken: nexpage,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      );
      console.log(driveFiles.data);
      let files = driveFiles.data.files;
      let finalArray = [];
      for await (let item of files) {
        expiryTime = new Date(props.user.expiry);
        current = new Date();
        if (expiryTime < current) {
          let res = await axios.post(`${SERVER_URI}/user/refresh`, {
            _id: props.user._id,
          });
          props.setUser(res.data.user);
          authToken = res.data.user.token;
        }
        const URL = "https://www.googleapis.com/drive/v3/files";

        const blob = await fetch(`${URL}/${item.id}?alt=media`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
        }).then((res) => res.blob());

        let storeResr = await storageRef.child(`${item.id}.jpg`).put(blob);
        let url = await storeResr.ref.getDownloadURL();
        let tempObj = {
          name: item.name,
          url: url,
          timestamp: item.imageMediaMetadata.time,
          width: item.imageMediaMetadata.width,
          height: item.imageMediaMetadata.height,
        };
        finalArray.push(tempObj);
      }

      props.addFromDrive(finalArray, props.user._id);
      if (driveFiles.data.nextPageToken) {
        setNext(driveFiles.data.nextPageToken);
      } else {
        setNext("");
        setlink("");
        setloadingModal(false);
      }
    } catch (error) {
      console.log("er", error);
    }
  };

  // const getdataPhotos = async () => {
  //   let res = await axios.get(`${SERVER_URI}/test`);
  //   // props.setUser(res.data.user);
  //   console.log("hmm", res);
  //   const tempArray = new Uint8Array(Object.values(res.data.newArray));
  //   console.log("tem", tempArray);
  //   var metadata = {
  //     contentType: "image/jpeg",
  //   };
  //   let storeResr = await storageRef.child(`test.jpg`).put(tempArray, metadata);
  //   console.log("hhm", storeResr);
  //   let url = await storeResr.ref.getDownloadURL();
  // };

  const getdataPhotos = async () => {
    // setloadingModal(true);
    let authToken = props.user.token;
    try {
      let expiryTime = new Date(props.user.expiry);
      let current = new Date();
      if (expiryTime < current) {
        let res = await axios.post(`${SERVER_URI}/user/refresh`, {
          _id: props.user._id,
        });
        props.setUser(res.data.user);
        authToken = res.data.user.token;
      }
      let driveFiles = await axios.get(
        "https://photoslibrary.googleapis.com/v1/mediaItems",

        {
          params: {
            pageSize: 100,
            pageToken: nexpage,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      );
      console.log(driveFiles.data);
      let files = driveFiles.data.mediaItems;
      let finalArray = [];
      for await (let item of files) {
        expiryTime = new Date(props.user.expiry);
        current = new Date();
        if (expiryTime < current) {
          let res = await axios.post(`${SERVER_URI}/user/refresh`, {
            _id: props.user._id,
          });
          props.setUser(res.data.user);
          authToken = res.data.user.token;
        }
        console.log("itesss", item);

        let res = await axios.post(`${SERVER_URI}/picture/uploadgooglephotos`, {
          url: item.baseUrl,
        });

        const tempArray = new Uint8Array(Object.values(res.data.newArray));

        var metadata = {
          contentType: "image/jpeg",
        };
        let storeResr = await storageRef
          .child(`${item.id}.jpg`)
          .put(tempArray, metadata);
        let url = await storeResr.ref.getDownloadURL();
        let tempObj = {
          name: item.filename,
          url: url,
          timestamp: item.mediaMetadata.creationTime,
          width: item.mediaMetadata.width,
          height: item.mediaMetadata.height,
          isphotos: true,
        };
        finalArray.push(tempObj);
      }

      props.addFromDrive(finalArray, props.user._id);
      if (driveFiles.data.nextPageToken) {
        setNext(driveFiles.data.nextPageToken);
      } else {
        setNext("");
        setlink("");
        setloadingModal(false);
      }
    } catch (error) {
      console.log("er", error);
    }
  };

  const rando = async () => {
    let images = await getFireImages();
    let meta = await getFireImagesMeta();
    setImages(images);
    setImageMeta(meta);

    // images.map((item, index) => {
    //   props.addNewPicture(item, meta[index].timeCreated);
    // });
  };

  const getFireImages = async () => {
    try {
      let result = await storageRef.listAll();

      let urlPromises = result.items.map(async (imageRef) =>
        imageRef.getDownloadURL()
      );
      return Promise.all(urlPromises);
    } catch (error) {
      console.log("er", error);
    }
  };

  const getFireImagesMeta = async () => {
    try {
      let result = await storageRef.listAll();

      let urlPromises = result.items.map(async (imageRef) =>
        imageRef.getMetadata()
      );
      return Promise.all(urlPromises);
    } catch (error) {
      console.log("er", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Modal
        visible={loadingModal}
        closable={false}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
      >
        <div>
          Please wait while we import your images. this may take a couple of
          minutes
          <Spin />
        </div>
      </Modal>
      {/* <div>
        {props.admin.labels.map((item, index) => {
          return <Button>{item.name}</Button>;
        })}
        <Button
          onClick={() => {
            history.push({
              pathname: "/cluster",
            });
          }}
        >
          Go to clustering
        </Button>
        {props.user.token.length === 0 && (
          <Button
            onClick={() => {
              window.location = "/auth/google";
            }}
          >
            Connect Google Account
          </Button>
        )}
        {props.user.token.length > 0 && (
          <div>
            <Input
              placeholder="Add drive URL"
              onChange={(e) => {
                setDrive(e.target.value);
              }}
              value={drive}
            />
            <Button
              onClick={() => {
                const splitVal = drive.split("/");
                setlink(splitVal[splitVal.length - 1]);
                getdata(splitVal[splitVal.length - 1]);
              }}
            >
              OK
            </Button>
            {nexpage && (
              <p>
                You have more images to upload, click on OK again to upload them
              </p>
            )}
          </div>
        )}
        {props.user.token.length > 0 && (
          <div>
            <Button
              onClick={() => {
                getdataPhotos();
              }}
            >
              Connect Google Photos
            </Button>
          </div>
        )}
      </div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "70%",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Upload.Dragger
          multiple={true}
          style={{ width: "348px", borderRadius: "10px" }}
          customRequest={async ({ file, onSuccess, onProgress }) => {
            let storeResr = await storageRef
              .child(`${file.name}.jpg`)
              .put(file);
            let url = await storeResr.ref.getDownloadURL();
            let tempObj = { name: file.name, url: url };
            props.addFromDrive([tempObj], props.user._id);
            onSuccess("ok");
          }}
        >
          <img src="https://img.icons8.com/android/48/000000/upload.png" />
          <p style={{ marginTop: "2%" }}>
            Click or drag file to this area to upload
          </p>
        </Upload.Dragger>
        OR
        <Button
          onClick={() => {
            console.log("hmm");
            if (props.user.token.length === 0) {
              window.location = "/auth/google";
            } else {
              getdataPhotos();
              setloadingModal(true);
            }
          }}
          style={{ backgroundColor: "#9BC056", color: "white" }}
        >
          Import Google Photos
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { admin: state.admin, user: state.user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNewLabel: AdminActions.addNewLabel,
      getLabel: AdminActions.getLabel,
      getAllPicture: AdminActions.getAllPicture,
      addNewPicture: AdminActions.addNewPicture,
      getUser: UserActions.getUser,
      setUser: UserActions.setUser,
      addFromDrive: AdminActions.addFromDrive,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ImportPhotosScreen);
