import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Button, message } from "antd";
import axios from "axios";

import { UserActions } from "../../redux/actions";
import { SERVER_URI } from "../../constants/server";
import { async } from "q";

const StroopRegScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  useEffect(() => {}, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h3 style={{ textAlign: "center" }}>
        Add new user for stroop experiment
      </h3>
      <div style={{ marginTop: "5%" }}>
        <Input
          placeholder="Name"
          style={{ marginBottom: "3%", borderRadius: "8px" }}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          placeholder="Email"
          style={{ marginBottom: "3%", borderRadius: "8px" }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          placeholder="Password"
          style={{ borderRadius: "8px" }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      {/* {props.user.err && (
        <p style={{ marginTop: "1%", color: "red" }}>{props.user.err}</p>
      )} */}
      <Button
        style={{ background: "white", marginTop: "2%" }}
        onClick={async () => {
          let userInfo = await axios.post(`${SERVER_URI}/user/register`, {
            name: username,
            email,
            password,
          });
          if (userInfo.data.error) {
            message.error(userInfo.data.message);
          } else {
            message.success(userInfo.data.message);
          }
        }}
      >
        Login
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StroopRegScreen);
