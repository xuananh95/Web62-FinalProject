import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalState from "./contexts/GlobalState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GlobalState>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </GlobalState>
);
