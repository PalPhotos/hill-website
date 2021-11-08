import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./styles.css";
const { SubMenu } = Menu;
const { Sider } = Layout;

const MenuTab = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const handleClick = (e) => {
    console.log("click ", e);
  };

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  if (props.user.name.length === 0) {
    return <div></div>;
  } else if (props.user.name.length > 0) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          theme={"light"}
        >
          <div className="logo" />
          <Menu theme={"light"} defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item
              key="1"
              onClick={() => {
                history.push("/");
              }}
            >
              All Photos
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => {
                history.push("/labelled");
              }}
            >
              All Labels
            </Menu.Item>
            <Menu.Item key="3">Unlabeled</Menu.Item>
            <Menu.Item
              key="4"
              onClick={() => {
                history.push("/import");
              }}
            >
              Import Photos
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    );
  }
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(MenuTab);
