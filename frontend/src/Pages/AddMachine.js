import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, Card, Layout } from "antd";
import SideBar from "../components/sidebar";
import "../css/mydiv.css"
import { Header , Body, Content} from "antd/lib/layout/layout";

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

const AddMachine = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Layout>
      <Header className="background">
        <div className="menubar">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        </div>
      </Header>

      <Content className="background">
        <br></br>
        <Card>
          <h1>เพิ่มเครื่องใหม่</h1>

          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["device", "serial number"]}
              label="Serial Number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["device", "name"]}
              label="ชื่อ"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name={["device", "type"]} label="ประเภท">
              <Input />
            </Form.Item>

            <Form.Item name={["device", "phone"]} label="บาร์โค้ด">
              <Input />
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
};

export default AddMachine;
