import "./index.css";
import App from "./App";
import store from "store";
import { BASE_URL } from "config/endpoints";

import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = BASE_URL;

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root"),
);
