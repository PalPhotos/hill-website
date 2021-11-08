import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Modal, Button } from "antd";
import { ReactPictureAnnotation } from "react-picture-annotation";
import Autosuggest from "react-autosuggest";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AdminActions, AnnotationActions } from "../../redux/actions";

import "./styles.css";

const SinglePhotoScreen = (props) => {
  const canvasRef = React.createRef();
  const canvasOverlayRef = React.createRef();
  const history = useHistory();
  const [currentStart, setCurrentStart] = useState([null, null]);
  const [isAnnotation, setIsAnnotation] = useState(true);
  const [isMask, setIsMask] = useState(false);
  const [isLabel, setIsLabel] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [url, setUrl] = useState(props.location.state.url);
  const [options, setOptions] = useState([
    { name: "happy" },
    { name: "hell" },
    { name: "hello" },
  ]);
  const [suggestions, setsuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    props.getLabel(props.user._id);
    props.getOnePicture(url);
  }, []);

  useEffect(() => {
    if (width.length === 0 || height.length === 0) {
      if (props.admin.picture.width && props.admin.picture.height) {
        setWidth(props.admin.picture.width * 2);
        setHeight(props.admin.picture.height * 2);
      } else {
        setWidth(760);
        setHeight(570);
      }
    }
  }, [props.admin.picture]);

  useEffect(() => {
    setAnnotations(props.annotation.annotations);
  }, [props.annotation.annotations.length]);

  // useEffect(() => {
  //   if (!isAnnotation) {
  //     drawImageFunc();
  //     let ranArray = genArray();
  //     drawColours(ranArray);
  //   }
  // }, [isAnnotation]);

  const onChangein = (event, { newValue }) => {
    setValue(newValue);
  };

  const drawImageFunc = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    };
    img.src = props.admin.picture.url;
  };

  const calculateMousePosition = (positionX, positionY) => {};

  const drawColours = (randArray) => {
    const canvas = canvasOverlayRef.current;
    const ctx = canvas.getContext("2d");
    randArray.map((item, index) => {
      item.map((subitem, subindex) => {
        ctx.beginPath();
        ctx.arc(subindex, index, 1, 0, 2 * Math.PI);
        if (subitem[0] === 0) {
          ctx.fillStyle = "yellow";
          ctx.fill();
        } else if (subitem[0] === 1) {
          ctx.fillStyle = "red";
          ctx.fill();
        } else if (subitem[0] === 2) {
          ctx.fillStyle = "blue";
          ctx.fill();
        }

        ctx.stroke();
        ctx.closePath();
      });
    });
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setsuggestions(getSuggestions(value));
  };

  const genArray = () => {
    let finArray = [];
    for (let i = 0; i < props.admin.picture.width; i++) {
      let tempArray = [];
      for (let j = 0; j < 800; j++) {
        if (i < 150 && j < 200) {
          tempArray.push([0]);
        } else if (i < 300 && j < 400) {
          tempArray.push([1]);
        } else if (
          i < props.admin.picture.height &&
          j < props.admin.picture.width
        ) {
          tempArray.push([2]);
        } else if (
          i < props.admin.picture.height &&
          j < props.admin.picture.width
        ) {
          tempArray.push([3]);
        } else {
          tempArray.push([4]);
        }
      }
      finArray.push(tempArray);
    }
    return finArray;
  };

  const onMouseDown = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    // const { positionX, positionY } = this.calculateMousePosition(
    //   offsetX,
    //   offsetY
    // );
    setCurrentStart([offsetX, offsetY]);
  };

  const onMouseMove = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    // const { positionX, positionY } = this.calculateMousePosition(
    //   offsetX,
    //   offsetY
    // );
    if (currentStart[0] !== null && currentStart[1] !== null) {
      const canvas = canvasOverlayRef.current;
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.stroke();
      ctx.closePath();
      const width = offsetX - currentStart[0];
      const height = offsetY - currentStart[1];
      ctx.beginPath();
      ctx.rect(currentStart[0], currentStart[1], width, height);
      ctx.stroke();
      ctx.closePath();
    }
  };

  const onMouseUp = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    // const { positionX, positionY } = this.calculateMousePosition(
    //   offsetX,
    //   offsetY
    // );
    // console.log("ya", offsetX, offsetY);
    const canvas = canvasOverlayRef.current;
    const ctx = canvas.getContext("2d");
    ctx.save();
    setCurrentStart([null, null]);
  };

  const escapeRegexCharacters = (str) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("^" + escapedValue, "i");
    const suggestions = props.admin.labels.filter((language) =>
      regex.test(language.name)
    );

    if (suggestions.length === 0) {
      return [{ isAddNew: true }];
    }

    return suggestions;
  };

  const onSelect = (selectedId) => console.log(selectedId);
  const onChange = (data) => {
    setAnnotations(data);
    console.log("daat", data);
  };
  const buttonStuff = () => {
    return (
      <div>
        <Button
          onClick={() => {
            setIsAnnotation(true);
          }}
          type={isAnnotation ? "primary" : null}
        >
          Annotate
        </Button>
        <Button
          onClick={() => {
            setIsAnnotation(false);
          }}
          type={isAnnotation ? null : "primary"}
        >
          Mask
        </Button>
      </div>
    );
  };

  const onSuggestionsClearRequested = () => {
    setsuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;
  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const onSuggestionSelected = (event, { suggestion }) => {};

  const inputProps = {
    placeholder: "Type a label",
    value,
    onChange: onChangein,
  };

  // if (props.admin.loading) {
  // } else {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#202020",
      }}
    >
      <Modal
        visible={isLabel}
        closable={false}
        centered
        footer={[
          <Button
            style={{
              borderColor: "#9BC056",
            }}
            onClick={() => {
              setIsLabel(false);
            }}
          >
            CANCEL
          </Button>,
          <Button
            onClick={() => {
              props.addNewLabelPic(
                value,
                props.admin.picture._id,
                props.user._id
              );
              setValue("");
              setIsLabel(false);
            }}
            style={{
              backgroundColor: "#9BC056",
              borderColor: "#9BC056",
              color: "white",
            }}
          >
            LABEL
          </Button>,
        ]}
      >
        <div>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={onSuggestionSelected}
            inputProps={inputProps}
          />
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: "2%",
          paddingTop: "2%",
        }}
      >
        {!isEdit ? (
          <Button
            style={{
              borderRadius: "50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#9BC056",
              height: "50px",
              width: "50px",
              padding: "8px",
              borderColor: "#9BC056",
              paddingLeft: "10px",
            }}
            onClick={() => {
              setIsEdit(true);
            }}
          >
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/tag-window.png"
              height="32px"
            />
          </Button>
        ) : (
          <div style={{ height: "50px" }}></div>
        )}
      </div>
      <div
        style={{
          height: "100%",
          width: "100%",
          // padding: "10% 23%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 20 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: !isAnnotation ? "center" : null,
            }}
          >
            {!isAnnotation && (
              <img
                height={height}
                width={width}
                src={props.admin.picture.url}
              />
            )}
            {isAnnotation && (
              <div
                className="boom"
                style={{ marginLeft: "12%", height: height }}
              >
                <ReactPictureAnnotation
                  image={props.admin.picture.url}
                  onSelect={onSelect}
                  onChange={onChange}
                  width={width}
                  height={height}
                  annotationData={annotations}
                />
              </div>
            )}
          </div>

          {isAnnotation && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button
                style={{
                  borderRadius: "50px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#9BC056",
                  height: "50px",
                  width: "50px",
                  padding: "10px",
                  borderColor: "#9BC056",
                  paddingLeft: "10px",
                }}
                onClick={() => {
                  annotations.map((item) => {
                    props.addNewAnnotation(props.admin.picture._id, item);
                  });
                }}
              >
                <img
                  src="https://img.icons8.com/material/48/ffffff/checkmark--v1.png"
                  height="26px"
                />
              </Button>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingTop: "5%",
            }}
          >
            {props.admin.picture.labels &&
              props.admin.picture.labels.map((item, index) => {
                return (
                  <Button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      borderColor: "black",
                      borderRadius: "16px",
                      marginRight: "1%",
                    }}
                  >
                    {item.name}
                  </Button>
                );
              })}
          </div>
        </div>
        {isEdit ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              paddingRight: "2%",
            }}
          >
            <Button
              style={{
                borderRadius: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#9BC056",
                height: "50px",
                width: "50px",
                padding: "10px",
                borderColor: "#9BC056",
                paddingLeft: "10px",
              }}
              onClick={() => {
                setIsAnnotation(true);
              }}
            >
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/picture-in-picture-alternative.png"
                height="26px"
              />
            </Button>
            <Button
              style={{
                borderRadius: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#9BC056",
                height: "50px",
                width: "50px",
                padding: "8px",
                borderColor: "#9BC056",
                paddingLeft: "10px",
                marginTop: "20%",
              }}
              onClick={() => {
                setIsMask(true);
              }}
            >
              <img
                src="https://img.icons8.com/material-sharp/48/ffffff/lasso-tool.png"
                height="32px"
              />
            </Button>
            <Button
              style={{
                borderRadius: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#9BC056",
                height: "50px",
                width: "50px",
                padding: "10px",
                borderColor: "#9BC056",
                paddingLeft: "10px",
                marginTop: "20%",
              }}
              onClick={() => {
                setIsLabel(true);
              }}
            >
              <img
                src="https://img.icons8.com/material/48/ffffff/bookmark-ribbon--v1.png"
                height="26px"
              />
            </Button>
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              paddingRight: "2%",
            }}
          >
            <div style={{ width: "50px" }} />
          </div>
        )}
      </div>

      {/* <div
        style={{
          flex: 0.3,
          backgroundColor: "#e1f5fe",
          height: window.innerHeight,
        }}
      >
        <div>
          <Button
            onClick={() => {
              setIsAnnotation(true);
            }}
            type={isAnnotation ? "primary" : null}
          >
            Annotate
          </Button>
          <Button
            onClick={() => {
              setIsAnnotation(false);
            }}
            type={isAnnotation ? null : "primary"}
          >
            Mask
          </Button>
        </div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={onSuggestionSelected}
          inputProps={inputProps}
        />
        <Button
          onClick={() => {
            props.addNewLabelPic(
              value,
              props.admin.picture.url,
              props.user._id
            );
            setValue("");
          }}
        >
          Add Label
        </Button>
        <div>
          Existing Labels
          <div>
            {props.admin.picture &&
              props.admin.picture.labels &&
              props.admin.picture.labels.map((item, index) => {
                return <Button>{item.name}</Button>;
              })}
          </div>
        </div>
        {isAnnotation && (
          <Button
            onClick={() => {
              annotations.map((item) => {
                props.addNewAnnotation(props.admin.picture._id, item);
              });
            }}
          >
            Save Annotations
          </Button>
        )}
        <Button
          onClick={() => {
            const canvas = canvasRef.current;
            canvas.toBlob((res) => {
              console.log("res", res);
            });
          }}
        >
          convert
        </Button>
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { admin: state.admin, user: state.user, annotation: state.annotation };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNewLabel: AdminActions.addNewLabel,
      getLabel: AdminActions.getLabel,
      addNewLabelPic: AdminActions.addNewLabelPic,
      getOnePicture: AdminActions.getOnePicture,
      addNewAnnotation: AnnotationActions.addNewAnnotation,
      getAnnotation: AnnotationActions.getAnnotation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SinglePhotoScreen);
