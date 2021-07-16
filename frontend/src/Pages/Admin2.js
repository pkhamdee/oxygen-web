import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, Card, Layout, Select } from "antd";
import SideBar from "../components/sidebar";
// import "../css/mydiv.css";
import { Header, Body, Content } from "antd/lib/layout/layout";

import Navbar from "../components/Navbar";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

const { Option } = Select;

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

function handleChangeName(name) {
  console.log(`selected user ${name}`);
}

function handleChangeRole(role) {
  console.log(`selected role ${role}`);
}

class Admin2 extends React.Component {
  state = {
    redirect: false,
    users: [],
  };

  componentDidMount() {
    console.log("here");
    axios.get("http://localhost:8080/users").then((ures) => {
      const users = ures.data.content;
      this.setState({
        users: ures.data.content,
      });
      console.log(ures.data.content);
    });
  }

  onFinish = async (values) => {
    console.log(this.state.users)
    this.setState({
      redirect: true,
    });
  };

  render() {
   
    if (sessionStorage.getItem("login") !== "true") {
      return <Redirect push to="/login" />;
    } else if (this.state.redirect == true) {
      console.log(sessionStorage.getItem("login"));
      console.log(this.state.redirect);
      return <Redirect push to="/" />;
    }
    

    const options = this.state.users;

    return (
      <Card>
        <h1>ตั้งค่าผู้ใช้งาน</h1>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="name"
            label="ชื่อผู้ใช้"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              defaultValue="ชื่อผู้ใช้งาน"
              style={{ width: 200 }}
              onChange={handleChangeName}
            >
              {options.map((option) => (
                <option name={option.firstName} key={option.id}>
                  {option.firstName + " " + option.lastName}
                  {console.log(option)}
                </option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="role"
            label="ตำแหน่ง"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              defaultValue="ตำแหน่ง"
              style={{ width: 200 }}
              onChange={handleChangeRole}
            >
              ระบุชื่อตำแหน่ง
              <Option role="1" key="1">ผู้ดูแล</Option>
              <Option role="2" key="2">อาสาสมัคร</Option>
            </Select>
          </Form.Item>

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
    );
  }
}

export default Admin2;
