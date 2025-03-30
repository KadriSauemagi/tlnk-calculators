import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { makeServer } from "./mirage";
import {Calculator} from './components/Calculator';

makeServer();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="py-20">
      <Calculator />
  </div>
  </React.StrictMode>,
);
