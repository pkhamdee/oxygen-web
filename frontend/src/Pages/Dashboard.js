import { Content, Header } from "antd/lib/layout/layout";
import React from "react";
import SideBar from "../components/sidebar";
import "../css/mydiv.css";
import { Layout } from "antd";
import "../css/dashboard.css";
import "../css/widget.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";



class Dashboard extends React.Component {
  state = {
    devices: []
  }

  componentDidMount() {
    axios.get('http://localhost:8080/devices')
      .then(res => {
        const devices = res.data;
        this.setState({ devices });
        console.log('td' + typeof this.state.devices);
        console.log('d' + this.state.devices);
      })
  }

  constructor(props) {
    super(props);
    this.state = {
      machines: [
        {
          deviceId: 1,//deviceId
          barcode: "aaaaaaaaaa",//barcode
          name: "0000000000",//name
          status: true,//status == available or inused
        },
        {
          deviceId: 2,
          barcode: "bbbbbbbbbb",
          name: "1111111111",
          status: true,
        },
        {
          deviceId: 3,
          barcode: "cccccccccc",
          name: "2222222222",
          status: false,
        },
        {
          deviceId: 4,
          barcode: "dddddddddd",
          name: "3333333333",
          status: true,
        },
      ],
      destination: "",
    };
  }

  renderTableHeader() {
    let header = Object.keys(this.state.machines[0]);
    return header.map((key, index) => {
      if (key != "status") {
        return <th key={index}>{key.toUpperCase()}</th>;
      }
    });
  }

  giveHandler = () => {
    this.setState({ destination: "give" });
  };

  renderTableData() {
    console.log('tm' + typeof this.state.machines);
    console.log('m' + this.state.machines);
    return this.state.machines.map((machine, index) => {
      const { deviceId, barcode, name, status } = machine; //destructuring
      return (
        <tr key={deviceId} bgcolor={!status ? "grey" : "white"}>
          <td>
            <font color={status ? "grey" : "white"}>{deviceId}</font>
          </td>
          <td>
            <font color={status ? "grey" : "white"}>{barcode}</font>
          </td>
          <td>
            <font color={status ? "grey" : "white"}>{name}</font>
          </td>
          <td>
            {" "}
            <Button
              variant={!status ? "outline-light" : "outline-error"}
              size="sm"
//              onClick="returnFunction()"
              disabled={status}
            >
              Return
            </Button>{" "}
          </td>
          <td>
            {" "}
            <Button
              variant={status ? "outline-success" : "outline-error"}
              size="sm"
              onClick={() => {
                this.giveHandler();
              }}
              disabled={!status}
            >
              Give
            </Button>{" "}
          </td>
        </tr>
      );
    });
  }

  render() {
    if (this.state.destination == "give") {
      return <Redirect push to="/give" />;
    }

    return (
      <Layout>
        <Header className="background">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        </Header>

        <Content className="background">
          <br></br>
          <div>
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <div className="card-box bg-blue">
                    <div className="inner">
                      <h3> 13436 </h3>
                      <p> Patient Summary </p>
                    </div>
                    <div className="icon">
                      <h1 className="fonticon">Patient</h1>
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="card-box bg-green">
                    <div className="inner">
                      <h3> 10/300 </h3>
                      <p> Available/Total </p>
                    </div>
                    <div className="icon">
                      <h1 className="fonticon">Oxygen</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex" }}></div>
            <table id="machines">
              <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
              </tbody>
            </table>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Dashboard;
