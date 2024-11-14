import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CrudPage from "./components/Pages/CrudPage";

const myComponent = <CrudPage />;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(myComponent);
