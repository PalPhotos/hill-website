import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./styles.css";

const NavbarCustom = () => {
  return (
    <Navbar expand="sm">
      <Navbar.Brand href="/">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <p className="pal">PAL </p>
          <p className="photos"> Photos</p>
        </div>
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavbarCustom;
