import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Modal, Button, Image } from "antd";
import { ReactPictureAnnotation } from "react-picture-annotation";
import Firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loading from "../../components/Loading";
import { AdminActions } from "../../redux/actions";

import "./styles.css";
import { setAllButPics } from "../../redux/actions/admin.action";

const ClusteringScreen = (props) => {
  const [curclus, setCurClus] = useState({});
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    props.getLabel(props.user._id);
    props.clearPics();
  }, []);

  if (props.admin.loading) {
    return <Loading />;
  } else {
    return (
      <div style={{}}>
        <Modal
          visible={visible}
          width={1000}
          onCancel={() => {
            setVisible(false);
          }}
          onOk={() => {
            let tempArray = props.admin.allButPics.filter((el) => {
              return el.selected === true;
            });
            props.addToCluster(tempArray, [curclus._id], props.user._id);

            setVisible(false);
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {props.admin.allButPics.map((item, index) => {
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
                      let tempObj = item;
                      if (tempObj.selected) {
                        tempObj.selected = false;
                      } else {
                        tempObj.selected = true;
                      }
                      let tempArray = props.admin.allButPics;
                      tempArray[index] = tempObj;
                      props.setAllButPics(tempArray);
                    }}
                  />
                  {item.selected && <Button>Selected</Button>}
                </div>
              );
            })}
          </div>
        </Modal>
        <div>
          Choose which cluster you would like to see!
          {props.admin.labels.map((item, index) => {
            return (
              <Button
                type={curclus.name === item.name ? "primary" : null}
                onClick={() => {
                  setCurClus(item);
                  props.getLabelPicture([item._id], props.user._id);
                }}
              >
                {item.name}
              </Button>
            );
          })}
          <Button
            onClick={() => {
              if (curclus.name) {
                setVisible(true);
                props.getPictureNotLabel([curclus._id], props.user._id);
              }
            }}
          >
            Add to the selected cluster
          </Button>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {props.admin.pictures.map((item, index) => {
            const randomnumber = Math.floor(Math.random() * 10) % 3;
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
                  // onClick={() => {
                  //   history.push({ pathname: "/single", state: { url: item } });
                  // }}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    props.editLabelPicture(
                      [curclus._id],
                      item.name,
                      curclus._id,
                      props.user._id
                    );
                  }}
                >
                  Remove
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
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
      editLabelPicture: AdminActions.editLabelPicture,
      getPictureNotLabel: AdminActions.getPictureNotLabel,
      setAllButPics: AdminActions.setAllButPics,
      addToCluster: AdminActions.addToCluster,
      clearPics: AdminActions.clearPics,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ClusteringScreen);
