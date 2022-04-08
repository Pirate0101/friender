
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ProtectedRoute from './component/Middlewares/protectedRoute'
import UnProtectedRoute from './component/Middlewares/unProtectedRoute'
import DefaultLayout from './component/Layout/defaultlayout';
import MainLayout from "./component/Layout/mainlayout";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';
function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <UnProtectedRoute exact path="/" datasection="login" component={DefaultLayout} />
          <UnProtectedRoute exact path="/setlaunchpad/:id" datasection="setlaunchpad" component={DefaultLayout} />
          <UnProtectedRoute exact path="/forgetpassword" datasection="forgetpassword" component={DefaultLayout} />
          <UnProtectedRoute exact path="/updatepassword" datasection="updatepassword" component={DefaultLayout} />
          <UnProtectedRoute exact path="/setpermissionsection/" datasection="setpermissionsection" component={DefaultLayout} />
          <ProtectedRoute exact path="/dashboard" datasection="dashboard" component={MainLayout} />

        </Switch>
      </Router>
    </React.Fragment>

  );
}


export default App;
