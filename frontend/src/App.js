import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Landing from './Pages/Landing';
import Landing from  './Pages/Landing';
import Give from './Pages/Give';
import Return from "./Pages/Return";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="container">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        
          <Route path="/give">
            <Give />
          </Route>
          <Route path="/return">
            <Return />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
