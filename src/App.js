import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Firebase from "firebase";
import { config } from "./config/firebase.config";

import { store } from "./redux";
import Main from "./navigation";
import NavbarCustom from "./components/Header";
import MenuTab from "./components/menu";

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
          {/* <MenuTab /> */}
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
