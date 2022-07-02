import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

let notesArray = localStorage.getItem("notes")
  ? JSON.parse(localStorage.getItem("notes"))
  : [];

localStorage.setItem("notes", JSON.stringify(notesArray));
const DATA = JSON.parse(localStorage.getItem("notes"));

localStorage.setItem("notes", JSON.stringify(DATA));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App notes={DATA} />
  </React.StrictMode>
);
