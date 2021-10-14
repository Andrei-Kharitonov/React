import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";

function Routers() {
  return (
    <Switch>
      <Route path="/about" component={AboutPage} />
      <Route exact path="/" component={HomePage} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Routers;