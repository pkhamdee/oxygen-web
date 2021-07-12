import React from "react";
import ReactDOM from "react-dom";
import {  Redirect } from "react-router-dom";
import "../css/style.css";
import SideBar from "../components/sidebar";

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from '../components/history';



function Landing() {
    this.state = {
      destination: ''
    };


    const receiveHandler = () => {
        this.setState({destination: 'receive'})
    }

    if (this.state.destination == 'receive'){
        return <Redirect push to="/return" />;
    }

  return (
    <div id="App">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />

      <div id="page-wrap">
        <h1>ระบบบริหารจัดการถังออกซิเจน</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <ButtonGroup vertical align="center">
          <Button variant="outline-primary" size="lg" block>
            ส่งถังออกซิเจนให้ผู้ป่วย
          </Button>
          {/* <Button variant="outline-primary" size="lg" block  onClick={() => history.push('/return')}> */}
          <Button
            variant="outline-primary"
            size="lg"
            block
            onClick={receiveHandler}
          >
            รับถังออกซิเจนคืน
          </Button>
          <Button variant="outline-primary" size="lg" block>
            กราฟ
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
// }

export default Landing;
