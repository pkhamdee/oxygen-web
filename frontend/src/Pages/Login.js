import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import "../css/mydiv.css";
import { Header, Body, Content } from "antd/lib/layout/layout";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: "",
      user: "",
      password: "",
    };
    sessionStorage.setItem("login", "false");
    console.log(sessionStorage.getItem("login"));
  }

  onFinish = (values) => {
    // console.log("Success:", values);
    // console.log("In finish handler");
    sessionStorage.setItem("login", "true");
    // console.log(values.username);
    // console.log(values.password);
    // console.log(sessionStorage.getItem("login"));
    this.setState({ redirect: "home" });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  registerHandler = () => {
    this.setState({ redirect: "register" });
  };

  render() {
    if (this.state.redirect == "home") {
      // console.log(sessionStorage.getItem("login"));
      // console.log(this.state.redirect);
      return <Redirect push to="/" />;
    } else if (this.state.redirect == "register") {
      // console.log(sessionStorage.getItem("login"));
      // console.log(this.state.redirect);
      return <Redirect push to="/register" />;
    }

    return (
      <div>
        <h1>Login</h1>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              htmlType="submit"
              type="primary"
              onClick={() => this.loginHandler}
            >
              Login
            </Button>
            <Button
              htmlType="button"
              style={{
                margin: "0 8px",
              }}
              onClick={() => this.registerHandler()}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;
