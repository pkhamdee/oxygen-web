import { Content, Header } from "antd/lib/layout/layout";
import React from "react";
import SideBar from "../components/sidebar";
import "../css/mydiv.css"
import { Form, Input, InputNumber, Button, Card, Layout } from "antd";

function Dashboard() {
  return (
    <Layout >
      <Header className="background">
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
      </Header>
      
      <Content className="background">
        <br></br>
      <div>
        <h2>Dashboard</h2>
      </div>
      </Content>
    </Layout>
  );
}

export default Dashboard;