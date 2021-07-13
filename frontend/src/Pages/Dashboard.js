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



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: [
        {
          id: 1,
          serialnumber: "aaaaaaaaaa",
          phonenum: "0000000000",
          available: true,
        },
        {
          id: 2,
          serialnumber: "bbbbbbbbbb",
          phonenum: "1111111111",
          available: true,
        },
        {
          id: 3,
          serialnumber: "cccccccccc",
          phonenum: "2222222222",
          available: false,
        },
        {
          id: 4,
          serialnumber: "dddddddddd",
          phonenum: "3333333333",
          available: true,
        },
      ],
      destination: "",
    };
  }

  renderTableHeader() {
    let header = Object.keys(this.state.machines[0]);
    return header.map((key, index) => {
      if (key != "available") {
        return <th key={index}>{key.toUpperCase()}</th>;
      }
    });
  }

  giveHandler = () => {
    this.setState({ destination: "give" });
  };

  renderTableData() {
    return this.state.machines.map((machine, index) => {
      const { id, serialnumber, phonenum, available } = machine; //destructuring
      return (
        <tr key={id} bgcolor={!available ? "grey" : "white"}>
          <td>
            <font color={available ? "grey" : "white"}>{id}</font>
          </td>
          <td>
            <font color={available ? "grey" : "white"}>{serialnumber}</font>
          </td>
          <td>
            <font color={available ? "grey" : "white"}>{phonenum}</font>
          </td>
          <td>
            {" "}
            <Button
              variant={!available ? "outline-light" : "outline-error"}
              size="sm"
              onClick="returnFunction()"
              disabled={available}
            >
              Return
            </Button>{" "}
          </td>
          <td>
            {" "}
            <Button
              variant={available ? "outline-success" : "outline-error"}
              size="sm"
              onClick={() => {
                this.giveHandler();
              }}
              disabled={!available}
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
