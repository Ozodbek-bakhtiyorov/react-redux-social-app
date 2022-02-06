import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles/>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
