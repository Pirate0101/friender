import React from "react";
import { HashRouter } from "react-router-dom";
import log from "./components/common/logger";
import AppLayout from "./components/layouts/AppLayout";
import "./all.css";
const App = () => {
  log.info("*** App ***");
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
};

export default App;
