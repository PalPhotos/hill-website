import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Modal, Button, Image, Input } from "antd";
import { ReactPictureAnnotation } from "react-picture-annotation";
import Firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AdminActions, UserActions } from "../../redux/actions";
import axios from "axios";

import "./styles.css";

const HomeScreen = (props) => {
  const [images, setImages] = useState([]);
  const [imageMeta, setImageMeta] = useState([]);
  const [nexpage, setNext] = useState("");
  const [drive, setDrive] = useState("");
  let storageRef = Firebase.storage().ref();
  const history = useHistory();
  const [options, setOptions] = useState([
    { name: "happy" },
    { name: "hell" },
    { name: "hello" },
  ]);

  useEffect(() => {
    // rando();
    // props.getLabel();
    console.log("look pa", props.location);
    const urlParams = new URLSearchParams(props.location.search);
    let user = urlParams.get("user");
    console.log("us", user);
    if (user && props.user.token.length === 0) {
      props.getUser(user);
      props.getAllPicture(user);
    } else if (props.user.token.length > 0) {
      props.getAllPicture(props.user._id);
    }
  }, []);

  const getdata = async (folderId) => {
    let authToken = props.user.token;
    try {
      let driveFiles = await axios.get(
        "https://www.googleapis.com/drive/v3/files",

        {
          params: {
            corpora: "user",
            fields:
              "files(id,name,size,mimeType,parents,webViewLink,trashed),nextPageToken",
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
      console.log("look", driveFiles);
      if (driveFiles.data.nextPageToken) {
        setNext(driveFiles.data.nextPageToken);
      } else {
        setNext("");
      }
      props.addFromDrive(driveFiles.data.files, props.user._id);
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

  const picInfo = props.admin.allPictures;

  return (
    <div style={{}}>
      <div>
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
                console.log("split", splitVal);
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
      </div>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {props.user.token.length > 0 &&
          picInfo.map((item, index) => {
            return (
              <div
                style={{
                  margin: ".5%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  height={150}
                  width={200}
                  src={item.name}
                  onClick={() => {
                    history.push({
                      pathname: "/single",
                      state: { url: item.name },
                    });
                  }}
                />
                {item.labels.map((item, index) => {
                  return <Button>{item.name}</Button>;
                })}
              </div>
            );
          })}
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
      addNewLabelPic: AdminActions.addNewLabelPic,
      getOnePicture: AdminActions.getOnePicture,
      getLabelPicture: AdminActions.getLabelPicture,
      getAllPicture: AdminActions.getAllPicture,
      addNewPicture: AdminActions.addNewPicture,
      getUser: UserActions.getUser,
      addFromDrive: AdminActions.addFromDrive,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
