import { Content, Header } from "antd/lib/layout/layout";
import React from "react";
import SideBar from "../components/sidebar";
import "../css/mydiv.css";
import { Layout } from "antd";
import "../css/dashboard.css";
import "../css/widget.css";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

class Dashboard extends React.Component {
  state = {
    devices: [],
    users: [],
    openModal: false,
    barcode: null,
    deviceId: null,
    info: {}
  };

  componentDidMount() {
    axios.get("http://localhost:8080/devices").then((dres) => {
      const devices = dres.data.content;
      axios.get("http://localhost:8080/users").then((ures) => {
        const users = ures.data.content;
        this.setState({ devices, users });
      });
    });
    let temp = JSON.parse(sessionStorage.getItem("info"))
    this.setState({info: temp})
  }

  componentDidUpdate() {
    axios.get("http://localhost:8080/devices").then((dres) => {
      const devices = dres.data.content;
      axios.get("http://localhost:8080/users").then((ures) => {
        const users = ures.data.content;
        this.setState({ devices, users });
      });
    });
  }

  renderTableHeader() {
    let key = this.state.devices;
    let header = key.map((device, index) => {
      let keyArray = Object.keys(device);
      return keyArray.map((header, sindex) => {
        switch (header) {
          // case "id":
          //   return <th key={sindex}> # </th>;
          //   break;
          case "barcode":
            return <th key={sindex}> หมายเลขเครื่อง </th>;
            break;
          case "name":
            return <th key={sindex}> ผู้ติดต่อ </th>;
            break;
        }
      });
    });
    return header[0]; // will be fix
  }

  giveHandler = async (number, id) => {
    await this.setState({
      destination: "give",
      chosenSerial: number,
      deviceId: id,
    });
  };

  countKey(obj, key, val) {
    let count = 0;
    obj.forEach((a) => {
      if (a[key] == val) {
        return (count += 1);
      }
    });
    return count;
  }

  handleModalShowHide() {
    this.setState({ openModal: !this.state.openModal });
  }

  handleModalClose(){
    sessionStorage.setItem('barcode', '');
    sessionStorage.setItem('deviceId', '');
    this.handleModalShowHide();
  }

  handleReturnDevice(rbarcode, rdeviceId) {
    this.handleModalShowHide();
    sessionStorage.setItem('barcode', rbarcode);
    sessionStorage.setItem('deviceId', rdeviceId);
  }

  returnDevice(barcode, deviceId) {
    let phonenum = JSON.parse(sessionStorage.getItem('info')).phone;
    if (barcode && deviceId) {
        let rheader = {
         headers: {
             'content-type': 'application/json'
         }
        };
        let rdata = {
            status: "4",
            name: phonenum,
            id: deviceId,
            barcode: barcode,
            user: {
                id: JSON.parse(sessionStorage.getItem('info')).id,
                phone: phonenum
            },
        };
        axios.put("http://localhost:8080/device/" + deviceId , rdata, rheader);
    }
    sessionStorage.setItem('barcode', '');
    sessionStorage.setItem('deviceId', '');
    this.handleModalShowHide();
  }

  renderTableData() {
    return this.state.devices.map((device, index) => {
      const { length, id, barcode, name, status } = device; //destructuring
      return (
        <tr key={id} bgcolor={status == 2 ? "grey" : "white"}>
          {/* <td>
            <font color={status == 4 ? "grey" : "white"}>{id}</font>
          </td> */}
          <td>
            <font color={status == 4 ? "grey" : "white"}>{name}</font>
          </td>
          <td>
            <font color={status == 4 ? "grey" : "white"}>{barcode}</font>
          </td>
          <td>
            <Button
              variant={status == 2 ? "outline-light" : "outline-error"}
              size="sm"
              onClick={() => this.handleReturnDevice(barcode, id)}
              disabled={status == 4}
            >
              Return
            </Button>
          </td>
          <td>
            <Button
              variant={status == 4 ? "outline-success" : "outline-error"}
              size="sm"
              value={barcode}
              onClick={() => {
                this.giveHandler(barcode, id);
              }}
              disabled={status == 2}
            >
              Give
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    if (this.state.destination == "give") {
      return (
        <Redirect
          to={`/give/${this.state.chosenSerial}/${this.state.deviceId}`}
        />
      );
    } else if (sessionStorage.getItem("login") !== "true") {
      return <Redirect push to="/login" />;
    }

    return (
      <div>
          <Modal show={this.state.openModal}>
              <Modal.Header closeButton onClick={() => this.handleModalClose()}>
              <Modal.Title>ยืนยันการคืนอุปกรณ์</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  ยืนยันการคืนอุปกรณ์หมายเลขเครื่อง {sessionStorage.getItem('barcode')}
              </Modal.Body>
              <Modal.Footer>
              <Button variant="secondary" onClick={() => this.handleModalClose()}>
                  Cancel
              </Button>
              <Button variant="primary" onClick={() => this.returnDevice(sessionStorage.getItem('barcode'), sessionStorage.getItem('deviceId'))}>
                  Confirm
              </Button>
              </Modal.Footer>
          </Modal>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="card-box bg-blue">
                <div className="inner">
                  <h3> {this.countKey(this.state.users, "type", "3")} </h3>
                  <p> จำนวนผู้ป่วย </p>
                </div>
                <div className="icon">
                  <h1 className="fonticon">Patient</h1>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="card-box bg-green">
                <div className="inner">
                  <h3>
                    {this.countKey(this.state.devices, "status", "4")}/
                    {this.state.devices.length}
                  </h3>
                  <p> จำนวนเครื่องว่าง/ทั้งหมด </p>
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
    );
  }
}

export default Dashboard;
