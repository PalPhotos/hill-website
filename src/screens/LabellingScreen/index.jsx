import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Button } from "antd";
import axios from "axios";
import { SERVER_URI } from "../../constants/server";
import { AdminActions, UserActions } from "../../redux/actions";
import Loading from "../../components/Loading";

import "./styles.css";

const LabellingScreen = (props) => {
  const history = useHistory();
  const [fileszz, setFiles] = useState("");
  const [loadingModal, setloadingModal] = useState(false);
  const [nexpage, setNext] = useState("");
  const [link, setlink] = useState("");
  const [index, setIndex] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  const [classes, setClasses] = useState({});

  useEffect(() => {
    // setlink("1MK5lmNa1YqiMCCl8gPmWdI8LBnDnLpU5");
    props.getPictureForLabelling();
  }, []);

  const escapeRegexCharacters = (str) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    console.log("es", escapedValue.length);

    if (escapedValue.length === 0) {
      setsuggestions([]);
    } else {
      const regex = new RegExp("^" + escapedValue, "i");
      const suggestions = props.admin.thePicsForLabellinbg.labels.filter(
        (language) => regex.test(language)
      );

      console.log("sug", suggestions);

      setsuggestions(suggestions);
    }
  };

  // useEffect(() => {
  //   if (nexpage.length > 0) {
  //     console.log("hmm");
  //     getdata("14ezZG9nGqALtuXP7zBnV7ovJ_GgrWDo4");
  //   }
  // }, [nexpage]);

  // const handleChange = (e) => {
  //   const fileReader = new FileReader();
  //   fileReader.readAsText(e.target.files[0], "UTF-8");
  //   fileReader.onload = (e) => {
  //     console.log("e.target.result", e.target.result);
  //     setFiles(JSON.parse(e.target.result));
  //   };
  // };

  // const getdata = async (folderId) => {
  //   setloadingModal(true);
  //   let authToken = props.user.token;
  //   try {
  //     let expiryTime = new Date(props.user.expiry);
  //     let current = new Date();
  //     if (expiryTime < current) {
  //       let res = await axios.post(`${SERVER_URI}/user/refresh`, {
  //         _id: props.user._id,
  //       });
  //       props.setUser(res.data.user);
  //       authToken = res.data.user.token;
  //     }
  //     let driveFiles = await axios.get(
  //       "https://www.googleapis.com/drive/v3/files",

  //       {
  //         params: {
  //           corpora: "user",
  //           fields:
  //             "files(id,name,webViewLink,imageMediaMetadata),nextPageToken",
  //           q: `'${folderId}' in parents and trashed = false`,
  //           pageSize: 1000,
  //           pageToken: nexpage,
  //         },
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + authToken,
  //         },
  //       }
  //     );
  //     let files = driveFiles.data.files;
  //     let finalArray = [];
  //     let k = 0;
  //     let j = 0;
  //     for await (let item of files) {
  //       k = k + 1;
  //       let imageName = item.name;
  //       let subName = imageName.slice(0, -4);
  //       if (subName) {
  //         j = j + 1;
  //         let labelsVal = fileszz[subName];
  //         let tempObject = {
  //           name: imageName,
  //           url: `https://drive.google.com/uc?id=${item.id}`,
  //           labels: labelsVal.predictions,
  //           dataset: "celebA",
  //           class: labelsVal.groundtruths[0],
  //           initLabels: labelsVal.predictions,
  //         };
  //         finalArray.push(tempObject);
  //         // let theClass = labelsVal.groundtruths[0];
  //         // if (classes[theClass]) {
  //         //   if (classes[theClass] < 22) {

  //         //     let tempObj = classes;
  //         //     let tempVal = tempObj[theClass];
  //         //     tempObj[theClass] = tempVal + 1;
  //         //     setClasses(tempObj);
  //         //   }
  //         // } else {
  //         //   let tempObj = classes;
  //         //   let obnjArray = Object.keys(tempObj);
  //         //   if (obnjArray.length < 40) {
  //         //     tempObj[theClass] = 1;
  //         //     setClasses(tempObj);
  //         //   }
  //         // }
  //         // console.log("loooo", classes);
  //       }
  //     }
  //     console.log("total", finalArray.length);
  //     // console.log("loooo clas", Object.keys(classes));
  //     // console.log("loooo", Object.keys(classes).length);
  //     while (finalArray.length > 0) {
  //       let lengthVal = 50;
  //       if (finalArray.length <= 50) {
  //         lengthVal = finalArray.length;
  //       }
  //       let uparray = finalArray.splice(0, lengthVal);
  //       props.addPictureForLabelling(uparray, props.user._id);
  //     }

  //     if (driveFiles.data.nextPageToken) {
  //       setNext(driveFiles.data.nextPageToken);
  //     } else {
  //       setNext("");
  //       setlink("");
  //       setloadingModal(false);
  //     }
  //   } catch (error) {
  //     console.log("er", error);
  //   }
  // };
  if (props.admin.loading) {
    return (
      <div style={{ width: "100%" }}>
        <Loading />
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* <input type="file" onChange={handleChange} />
      <Button
        onClick={() => {
          getdata("14ezZG9nGqALtuXP7zBnV7ovJ_GgrWDo4");
        }}
      >
        click
      </Button> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ textAlign: "center" }}>
            Please click on the words you think are associated with this image
            <br />
            You can add more words which you think can be associated with this
            image in the textbox provided below
            <br />
            Please click on "Next" once you are satisfied with your response
          </p>
          {props.admin.thePicsForLabellinbg.url && (
            <img
              src={props.admin.thePicsForLabellinbg.url}
              style={{ height: "200px", width: "200px", margin: "2%" }}
            />
          )}

          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {props.admin.thePicsForLabellinbg.labels &&
              props.admin.thePicsForLabellinbg.labels.map((item, index) => {
                if (index < 50) {
                  return (
                    <Button
                      style={{
                        background: props.admin.selectedIndexes[index]
                          ? "#9BC056"
                          : "white",
                        borderColor: props.admin.selectedIndexes[index]
                          ? "white"
                          : "lightgrey",
                        color: props.admin.selectedIndexes[index]
                          ? "white"
                          : "black",
                      }}
                      onClick={() => {
                        console.log("ng");
                        let tempObj = props.admin.selectedIndexes;
                        if (tempObj[index]) {
                          tempObj[index] = false;
                        } else {
                          tempObj[index] = true;
                        }
                        props.setSelectedIndex(tempObj);
                      }}
                    >
                      {item}
                    </Button>
                  );
                }
              })}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              margin: "2%",
            }}
          >
            <div style={{ width: "40%" }}>
              <Input
                placeholder={"Suggested Label"}
                style={{ marginRight: "2%", width: "100%" }}
                value={inputVal}
                onChange={async (e) => {
                  let word = e.target.value;
                  getSuggestions(word);
                  setInputVal(word);
                }}
              />
              {suggestions.length > 0 &&
                suggestions.map((item, index) => {
                  if (index < 5) {
                    return (
                      <Button
                        style={{ width: "100%", textAlign: "left" }}
                        onClick={() => {
                          setInputVal(item);
                          setsuggestions([]);
                        }}
                      >
                        {item}
                      </Button>
                    );
                  }
                })}
            </div>

            <Button
              style={{ margin: "2%", background: "#9BC056", color: "white" }}
              onClick={() => {
                let tmepObj = props.admin.thePicsForLabellinbg;
                let tempLabels = props.admin.thePicsForLabellinbg.labels;
                tempLabels.unshift(inputVal);
                tmepObj.labels = tempLabels;
                props.setPictureForLabelling(tmepObj);
                setInputVal("");
                let tempObj = {};
                let secondObj = props.admin.selectedIndexes;
                tempObj[0] = true;
                for (let i = 1; i < tempLabels.length; i++) {
                  if (secondObj[i - 1]) {
                    tempObj[i] = secondObj[i - 1];
                  }
                }
                props.setSelectedIndex(tempObj);
              }}
            >
              Add
            </Button>
          </div>

          <Button
            style={{ marginTop: "5%", background: "#9BC056", color: "white" }}
            onClick={async () => {
              let labels = props.admin.thePicsForLabellinbg.labels;
              let finArray = [];
              let i = 0;
              for await (let item of labels) {
                if (props.admin.selectedIndexes[i]) {
                  finArray.push(item);
                }
                i = i + 1;
              }
              props.setPictureAfterLabelling(
                props.admin.thePicsForLabellinbg._id,
                finArray
              );
            }}
          >
            Next
          </Button>
        </div>
        <br />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { user: state.user, admin: state.admin };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUser: UserActions.getUser,
      setUser: UserActions.setUser,
      addPictureForLabelling: AdminActions.addPictureForLabelling,
      getPictureForLabelling: AdminActions.getPictureForLabelling,
      setSelectedIndex: AdminActions.setSelectedIndex,
      setPictureForLabelling: AdminActions.setPictureForLabelling,
      setPictureAfterLabelling: AdminActions.setPictureAfterLabelling,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LabellingScreen);
