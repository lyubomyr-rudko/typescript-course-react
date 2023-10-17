// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ModalProvider } from "./lesson14/Components/ModalProvider/ModalProvider";
import "./index.css";
import "reset-css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ModalProvider>
    <App />
  </ModalProvider>

);
