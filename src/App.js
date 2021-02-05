import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Firebase from "firebase";
import { config } from "./config/firebase.config";

import { store } from "./redux";
import Main from "./navigation";

import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  useEffect(() => {
    Firebase.initializeApp(config);
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <NavbarCustom /> */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
