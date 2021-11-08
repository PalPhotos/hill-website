import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Button, message } from "antd";
import axios from "axios";
import { SERVER_URI } from "../../constants/server";

import { UserActions } from "../../redux/actions";

const DownloadScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "10%",
      }}
    >
      <iframe
        type="application/pdf"
        src={
          "https://firebasestorage.googleapis.com/v0/b/glass-app-67aa6.appspot.com/o/Computer_Breaks_Consent-Form-Non-Biomedical-2Nov2021.pdf?alt=media&token=9d9d1c33-2e1b-4f0c-a200-f2d54e3d030d"
        }
        width={"800px"}
        height={"500px"}
        scrolling="no"
        frameborder="0"
      />
      <p style={{ marginTop: "1%" }}>
        I understand the procedures described above. My questions have been
        answered to my satisfaction, and I agree to participate in this study. I
        have been given a copy of this form.
        <br />
        By signing this consent form, I acknowledge my understanding and consent
        to the collection, storage and transfer (if applicable) of my personal
        information to the United States.
      </p>
      <Input
        placeholder="Full Name"
        style={{ marginBottom: "3%", borderRadius: "8px" }}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <Input
        placeholder="Date"
        style={{ borderRadius: "8px" }}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
        style={{ margin: "2%" }}
        onClick={async () => {
          window.location.assign("https://youtu.be/sPWcvDTUHSk");
        }}
      >
        Click here to watch a demo of the application!
      </Button>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "2%",
        }}
      >
        <Button
          style={{ marginRight: "2%" }}
          onClick={async () => {
            try {
              if (username.length > 0 && password.length > 0) {
                let res = await axios.post(`${SERVER_URI}/user/get-down-link`, {
                  name: username,
                  dateVal: password,
                });
                window.location.assign(res.data.finLink[1]);
              } else {
                message.error(
                  "Please fill in your name and the date to enable the download"
                );
              }
            } catch (error) {
              console.log("err", error);
            }
          }}
        >
          Download the Windows application here!
        </Button>
        <Button
          style={{ marginLeft: "2%" }}
          onClick={async () => {
            try {
              if (username.length > 0 && password.length > 0) {
                let res = await axios.post(`${SERVER_URI}/user/get-down-link`, {
                  name: username,
                  dateVal: password,
                });
                window.location.assign(res.data.finLink[0]);
              } else {
                message.error(
                  "Please fill in your name and the date to enable the download"
                );
              }
            } catch (error) {
              console.log("err", error);
            }
          }}
        >
          Download the Mac application here!
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DownloadScreen);
