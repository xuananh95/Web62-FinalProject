import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalState from "./contexts/GlobalState";
import { Store } from "./contexts/Redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={Store}>
        <GlobalState>
            <BrowserRouter>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </BrowserRouter>
        </GlobalState>
    </Provider>
);
