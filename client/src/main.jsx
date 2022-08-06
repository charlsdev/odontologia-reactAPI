import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
const App = lazy(() => import("./App"));
import { BrowserRouter } from "react-router-dom";
import Loader from "./components/Loader";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/barra.min.css";
import "./assets/css/general.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   //<Suspense fallback={<Loader />}>
      <React.StrictMode>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </React.StrictMode>
   //</Suspense>
);
