import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Modal, Button, Image } from "antd";
import { ReactPictureAnnotation } from "react-picture-annotation";
import Firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AdminActions } from "../../redux/actions";

import "./styles.css";

const HomeScreen = (props) => {
  const [images, setImages] = useState([]);
  const [imageMeta, setImageMeta] = useState([]);
  let storageRef = Firebase.storage().ref();
  const history = useHistory();
  const [options, setOptions] = useState([
    { name: "happy" },
    { name: "hell" },
    { name: "hello" },
  ]);

  useEffect(() => {
    // rando();
    props.getLabel();
    props.getAllPicture();
  }, []);

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
      </div>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {picInfo.map((item, index) => {
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
  return { admin: state.admin };
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
