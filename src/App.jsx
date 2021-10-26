import { hot } from "react-hot-loader/root";
import React from "react";
import Routers from "./routers/router";
import Title from "./components/Title";

function App() {
  return (
    <div className="container">
      <Title />
      <Routers />
    </div>
  );
}

export default hot(App);