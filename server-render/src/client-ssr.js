import React from "react";
import { hydrate } from "react-dom";
import { App } from "./page";

hydrate(<App />, document.getElementById("ssr-container"));
