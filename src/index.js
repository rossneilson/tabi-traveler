import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import * as firebase from "firebase/app";
// import "firebase/performance";

// import * as Config from './config.js';
import "./i18n";
import Main from "./main/Main";

// firebase.initializeApp(Config.firebaseConfig);
// const perf = firebase.performance();
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Suspense fallback={<div style={{ backgroundColor: "white" }} />}>
        <Route exact path="/" component={Main} />
      </Suspense>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.register();
