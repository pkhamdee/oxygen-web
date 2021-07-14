import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Landing from './Pages/Landing';
import Landing from "./Pages/Landing";
import Give from "./Pages/Give";
import Return from "./Pages/Return";
import Dashboard from "./Pages/Dashboard";
import AddMachine from "./Pages/AddMachine";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="container">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/login" component={Login} />
          <div>
            <Navbar />
          <Route path="/give/:chosenSerial" exact={true} component={Give} />
          <Route path="/return">
            <Return />
          </Route>
          <Route path="/landing">
            <Landing />
          </Route>
          <Route path="/addmachine">
            <AddMachine />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route exact path="/">
            <Dashboard />
          </Route>
          </div>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
