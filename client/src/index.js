import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/main.css";
import AuthProvider from "./services/auth/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
