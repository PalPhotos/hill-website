import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Button } from "antd";

import { UserActions } from "../../redux/actions";

import "./styles.css";

const LoginScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search);
    // let user = urlParams.get("user");
    let user = "606af7c0a0e43c0648c25f37";
    if (user && user.length > 0) {
      props.getUser(user);
    } else {
      props.resetUser();
    }
  }, []);

  useEffect(() => {
    if (props.user.name.length > 0) {
      history.push("/");
    }
  }, [props.user]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Welcome To PAL Lab</h1>
      <h3 style={{ textAlign: "center" }}>Please Login To Continue</h3>
      <div style={{ marginTop: "5%" }}>
        <Input
          placeholder="Username / Email"
          style={{ marginBottom: "3%", borderRadius: "8px" }}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
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
      {props.user.err && (
        <p style={{ marginTop: "1%", color: "red" }}>{props.user.err}</p>
      )}
      <Button
        style={{ background: "white", marginTop: "2%" }}
        onClick={() => {
          props.loginUser(username, password);
        }}
      >
        Login
      </Button>

      <p style={{ marginTop: "2%" }}>OR</p>
      <Button
        style={{ backgroundColor: "#9BC056", color: "white" }}
        onClick={() => {
          window.location = "/auth/google";
        }}
      >
        Google Login
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loginUser: UserActions.loginUser,
      resetUser: UserActions.resetUser,
      getUser: UserActions.getUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
