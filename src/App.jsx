import { hot } from "react-hot-loader/root";
import React from "react";
import Title from "./components/UI/Title";
import Counter from "./components/Counter";

function App() {
  return (
    <div className="container">
      <Title />
      <Counter />
    </div>
  );
}

export default hot(App);