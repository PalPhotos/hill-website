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
  const [url, setUrl] = useState(props.location.state.url);
  const [options, setOptions] = useState([
    { name: "happy" },
    { name: "hell" },
    { name: "hello" },
  ]);
  const [suggestions, setsuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    props.getLabel(props.user._id);
    props.getOnePicture(url);
  }, []);

  useEffect(() => {
    setAnnotations(props.annotation.annotations);
  }, [props.annotation.annotations.length]);

  useEffect(() => {
    if (!isAnnotation) {
      drawImageFunc();
      let ranArray = genArray();
      drawColours(ranArray);
    }
  }, [isAnnotation]);

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
    img.src = url;
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
    for (let i = 0; i < 600; i++) {
      let tempArray = [];
      for (let j = 0; j < 800; j++) {
        if (i < 150 && j < 200) {
          tempArray.push([0]);
        } else if (i < 300 && j < 400) {
          tempArray.push([1]);
        } else if (i < 450 && j < 600) {
          tempArray.push([2]);
        } else if (i < 450 && j < 600) {
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
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        id="sexy"
        style={{
          flex: 0.7,
          height: "100%",
        }}
      >
        {isAnnotation ? (
          <div
            className="boom"
            style={{
              position: "absolute",
              top: "25%",
              left: "12.5%",
            }}
          >
            <ReactPictureAnnotation
              image={url}
              onSelect={onSelect}
              onChange={onChange}
              width={600}
              height={450}
              annotationData={annotations}
            />
          </div>
        ) : (
          <div
            className="boom"
            style={{
              position: "absolute",
              top: "25%",
              left: "12.5%",
            }}
          >
            <canvas
              id="canvas"
              ref={canvasRef}
              width={600}
              height={450}
              // style={{
              //   backgroundColor: "rgb(63, 63, 63)",
              //   border: "1px solid rgb(214, 214, 214)",
              // }}
              style={{ backgroundColor: "black", position: "absolute" }}
            ></canvas>
            <canvas
              id="canvas"
              ref={canvasOverlayRef}
              width={600}
              height={450}
              // style={{
              //   backgroundColor: "rgb(63, 63, 63)",
              //   border: "1px solid rgb(214, 214, 214)",
              // }}

              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              style={{ position: "absolute", opacity: 0.6 }}
            ></canvas>
          </div>
        )}
      </div>
      <div
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
            props.addNewLabelPic(value, url, props.user._id);
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
      </div>
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
