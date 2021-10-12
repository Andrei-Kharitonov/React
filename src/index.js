require.context("@img/", true, /\.(png|jpg|svg|webp)$/);
require.context("@style/", true, /\.(css|scss|sass|less)$/);
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);