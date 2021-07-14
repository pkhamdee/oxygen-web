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
    devices: [],
  };

  componentDidMount() {
    axios.get("http://localhost:8080/devices").then((res) => {
      const devices = res.data.content;
      this.setState({ devices });
    });
  }

  constructor(props) {
    super(props);
    axios.get("http://localhost:8080/devices").then((res) => {
      const devices = res.data.content;
      this.state = devices;
    });
  }
  //
  //  renderTableHeader() {
  //    console.log('Header');
  //    console.log(this.state.devices);
  //    let header = Object.keys(this.state.devices);
  //    return header.map((key, index) => {
  //      if (key != "status") {
  //        return <th key={index}>{key.toUpperCase()}</th>;
  //      }
  //    });
  //  }
  //
  renderTableHeader() {
    console.log("Head");
    let key = this.state.devices;
    let header = key.map((device, index) => {
      let keyArray = Object.keys(device);
      return keyArray.map((header, sindex) => {
        if (header != "status") {
          return <th key={sindex}> {header.toUpperCase()} </th>;
        }
      });
    });
    return header[0]; // will be fix
  }

  giveHandler = async (number) => {
    // console.log(number)
    await this.setState({ destination: "give", chosenSerial: number });
    console.log(this.state.chosenSerial);
  };

  renderTableData() {
    console.log("Data");
    return this.state.devices.map((device, index) => {
      const { length, deviceId, barcode, name, status } = device; //destructuring
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
              // onClick="returnFunction()"
              // disabled={available}
              value={deviceId}
            >
              Return
            </Button>{" "}
          </td>
          <td>
            {" "}
            <Button
              variant={status ? "outline-success" : "outline-error"}
              size="sm"
              value={deviceId}
              onClick={() => {
                this.giveHandler(deviceId);
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
    console.log(sessionStorage.getItem("login"));
    if (sessionStorage.getItem("login") !== "true") {
      console.log(sessionStorage.getItem("login"));
      return <Redirect push to="/login" />;
    }

    if (this.state.destination == "give") {
      return <Redirect to={`/give/${this.state.chosenSerial}`} />;
    }

    return (
      // <Layout>
      //   <Header className="background">
      //     {/* <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} /> */}
      //   </Header>

      //   <Content className="background">
      //     <br></br>
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
                  <h3> 10/{this.state.devices.length} </h3>
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
      //   </Content>
      // </Layout>
    );
  }
}

export default Dashboard;
