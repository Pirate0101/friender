import React from "react";
import logger from "../common/logger";
import AppRoutes from "../../routes/AppRoute";
import "./applayout.css";

const AppLayout = () => {
  // logger.info("*** AppLayout ***");
  return (
    <div className="App-wrapper">
      <AppRoutes />
    </div>
  );
};

export default AppLayout;
