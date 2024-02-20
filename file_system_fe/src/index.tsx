import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { RouterProvider } from "react-router-dom";
// import router from "./router";
import TanstackProvider from "./components/TanstackProvider/TanstackProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <TanstackProvider>
    {/* <RouterProvider router={router} /> */}
    <App />
  </TanstackProvider>
);
