import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import {loadCSSVaribalesDynamically} from "./styles";
import { appRouter } from "./app";

const htmlRootElement = document.documentElement;
loadCSSVaribalesDynamically(htmlRootElement);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>
);
