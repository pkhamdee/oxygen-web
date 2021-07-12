import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import "../css/mydiv.css";
import { Header, Body, Content } from "antd/lib/layout/layout";


const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
          <Button htmlType="submit" type="primary">
            Login
          </Button>
          <Button
            htmlType="button"
            style={{
              margin: "0 8px",
            }}
            onClick={() => console.log("pressed")}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
