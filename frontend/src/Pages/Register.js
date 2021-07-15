import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, Card } from "antd";
import SideBar from "../components/sidebar";
import "../css/mydiv.css";
import { Header, Content } from "antd/lib/layout/layout";
import { Layout } from "antd";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

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

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      data: {
        firstName: "",
        lastName: "",
        userName: "",
        age: null,
        phone: "",
        location: "",
        passwd: "",
        type: 1,
      },
    };
  }

  onFinish = (values) => {
    console.log(values);
    console.log(values.user.name.split(" ")[0]);
    let firstname = values.user.name.split(" ")[0];
    let lastname;
    try {
      lastname = values.user.name.split(" ")[1];
    } catch (e) {
      lastname = "";
    }
    this.setState({
      redirect: true,
      data: {
        firstName: firstname,
        lastName: lastname,
        userName: values.user.username,
        age: values.user.age,
        phone: values.user.phone,
        location: values.user.address,
        passwd: values.password,
        type: 1,
      },
    });
    console.log(this.state.data);
    axios.post("http://localhost:8080/user", this.state.data, {
      headers: {
        "content-type": "application/json",
      },
    });
  };

  render() {
    if (this.state.redirect == true) {
      console.log(sessionStorage.getItem("login"));
      console.log(this.state.redirect);
      return <Redirect push to="/login" />;
    }

    return (
      <Layout>
        <Content>
          <Card>
            <h1>Register</h1>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["user", "name"]}
                label="ชื่อ"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "username"]}
                label="Username"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "age"]}
                label="อายุ"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    max: 99,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item name={["user", "phone"]} label="เบอร์โทร">
                <Input />
              </Form.Item>
              <Form.Item name={["user", "address"]} label="ที่อยู่">
                <Input.TextArea />
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
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
    );
  }
}

export default Register;
