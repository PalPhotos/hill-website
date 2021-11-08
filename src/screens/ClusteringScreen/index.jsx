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
  const [curclus, setCurClus] = useState("");
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    props.getLabelPicture(props.user._id);
    props.clearPics();
  }, []);

  if (props.admin.loading) {
    return (
      <div style={{ width: "100%" }}>
        <Loading />
      </div>
    );
  } else if (curclus.length > 0) {
    let pic = props.admin.pictures[curclus];
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {pic.map((subItem, index) => {
            return (
              <div
                style={{
                  margin: ".5%",
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                }}
              >
                <img
                  height={150}
                  width={200}
                  src={subItem.url}
                  onClick={() => {
                    history.push({
                      pathname: "/single",
                      state: { url: subItem._id },
                    });
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                  onClick={() => {
                    history.push({
                      pathname: "/single",
                      state: { url: subItem._id },
                    });
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "rgba(0,0,0,0.32)",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {subItem.labels.map((labelItem, index) => {
                      if (index < 2) {
                        return (
                          <p
                            style={{
                              color: "white",
                              textAlign: "center",
                              padding: "3px",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              margin: "0px",
                            }}
                          >
                            {labelItem.name} |
                          </p>
                        );
                      }
                    })}
                    {subItem.labels.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <p
                          style={{
                            color: "white",
                            textAlign: "center",
                            padding: "3px",
                            margin: "0px",
                            backgroundColor: "#202020",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50px",
                          }}
                        >
                          {subItem.labels.length}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {props.admin.labels.map((item, index) => {
            let pic = props.admin.pictures[item.name];
            return (
              <div
                style={{
                  margin: ".5%",
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                }}
              >
                <img
                  height={150}
                  width={200}
                  src={pic[0].url}
                  onClick={() => {}}
                />
                <div
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                  onClick={() => {
                    setCurClus(item.name);
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "rgba(0,0,0,0.20)",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "white",
                        textAlign: "center",
                        padding: "3px",
                        paddingTop: "5px",
                        paddingBottom: "2px",
                        margin: "0px",
                      }}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(0,0,0,0.20)",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "white",
                        textAlign: "center",
                        padding: "3px",
                        paddingTop: "2px",
                        paddingBottom: "5px",
                        margin: "0px",
                      }}
                    >
                      {pic.length} {pic.length === 1 ? "photo" : "photos"}
                    </p>
                  </div>
                </div>
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
