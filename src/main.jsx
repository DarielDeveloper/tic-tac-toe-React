import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  /* React.StrictMode es un modo donde se ejecuta en el entorno de desarrollo ya que en este modo react hace mas validaciones para buscar errores en el código.  */
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
