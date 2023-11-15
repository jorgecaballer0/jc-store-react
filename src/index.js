import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../src/Firebase/configFirebase";

initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));

