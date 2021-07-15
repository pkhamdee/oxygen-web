import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, Card, Layout } from "antd";
import SideBar from "../components/sidebar";
import "../css/mydiv.css";
import { Header, Body, Content } from "antd/lib/layout/layout";

import Navbar from "../components/Navbar";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

class AddMachine extends React.Component {
  state = {
    devices: [],
  };
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  onFinish = (values) => {
    console.log(values);
    this.setState({
      redirect: true,
      data: {
        barcode: values.barcode,
        status: 4,
      },
    });
    console.log(values.barcode);
    console.log(values.status);
    console.log(this.state.data);
    axios.post("http://localhost:8080/device", this.state.data, {
      headers: {
        "content-type": "application/json",
      },
    });
  };

  render() {
    console.log(this.state.redirect);
    if (sessionStorage.getItem("login") !== "true") {
      return <Redirect push to="/login" />;
    } else if (this.state.redirect == true) {
      console.log(sessionStorage.getItem("login"));
      console.log(this.state.redirect);
      return <Redirect push to="/" />;
    }

    return (
      // <Layout>
      //   <Header className="background">
      //     <div className="menubar">
      //       {/* <Navbar pageWrapId={"page-wrap"} outerContainerId={"App"} /> */}
      //     </div>
      //   </Header>

      //   <Content className="background">
      <Card>
        <h1>เพิ่มเครื่องใหม่</h1>

        <Form
          {...layout}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["barcode"]}
            label="หมายเลขเครื่อง"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name={["device", "name"]}
            label="ชื่อ"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          {/* <Form.Item name={["device", "type"]} label="ประเภท">
          <Input />
        </Form.Item> */}

          {/* <Form.Item name={["device", "phone"]} label="บาร์โค้ด">
          <Input />
        </Form.Item> */}

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              // onClick={() => this.loginHandler}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      //   </Content>
      // </Layout>
    );
  }
}

export default AddMachine;
