import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { makeServer } from "./mirage";
import {Calculator} from './components/Calculator';

makeServer();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="mx-auto my-20">
      <Calculator />

    <div className="border bg-gray-100 m-20">
      <App/>
    </div>
  </div>
  </React.StrictMode>,
);
