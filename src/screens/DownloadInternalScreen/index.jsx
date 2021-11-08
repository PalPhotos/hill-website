import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Button } from "antd";

import { UserActions } from "../../redux/actions";

const DownloadInternalScreen = (props) => {
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <a href="https://drive.google.com/file/d/1WZ52-2W5yyMtNOmw7Z0SriNjy1pcBkHb/view?usp=sharing">
        Download the app with all breaks here!
      </a>
      <a href="https://drive.google.com/file/d/1trq5s3EnR2Ffl9jMv9iFsa6ZYFVI5ze9/view?usp=sharing">
        Download the app with scheduled breaks here!
      </a>
      <a href="https://drive.google.com/file/d/12MZYE_wQ7gFkXCNK36zF1TOC4gGpriLm/view?usp=sharing">
        Download the app with interval breaks here!
      </a>
      <a href="https://drive.google.com/file/d/15KmZlhatbgIeS9hCpYl3ge0s8aBP35B2/view?usp=sharing">
        Download the app with activity breaks here!
      </a>
      <a href="https://drive.google.com/file/d/1nlFSF_cdTcnvUVOBSw1jMN-8II5cIl_p/view?usp=sharing">
        Download the app with no breaks here!
      </a>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadInternalScreen);
