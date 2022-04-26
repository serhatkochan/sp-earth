import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

const configStore = configureStore();

root.render(
  <Provider store={configStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
);
