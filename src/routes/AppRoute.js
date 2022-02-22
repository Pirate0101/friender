import React, { lazy, Suspense } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import log from "../components/common/logger";
import { Container } from "reactstrap";
import classNames from "classnames";



const Login = lazy(() => import("../components/modules/Auth/Login"));
const ForgotPassword = lazy(() => import("../components/modules/Auth/ForgotPassword"));
const NotFound = lazy(() => import("../components/modules/Auth/NotFound"));
const Dashboard = lazy(() => import("../components/modules/Main/Dashboard"));
const Setting = lazy(() => import("../components/modules/Setting/setting"));
const DelaySetting = lazy(() => import("../components/modules/DelaySetting/setting"));
const AutoResponder = lazy(() => import("../components/modules/AutoResponder/autoResponder"));
const AutoResponderCreate = lazy(() =>  import("../components/modules/AutoResponder/autoResponderCreate"))
const AutoResponderEdit = lazy(() =>  import("../components/modules/AutoResponder/autoResponderEdit"));

const Logout  = lazy(() =>  import("../components/modules/Auth/logout"));
const AppRoute = ({ sidebarIsOpen, toggleSidebar }) => {
  log.info("**** AppRoute ****");

  return (
    <Suspense fallback={<div />}>
      <Container
        fluid
        className={classNames("content", { "is-open": sidebarIsOpen })}
      >
        {/* <Topbar toggleSidebar={toggleSidebar} /> */}
        <Switch>
        <Route exact path="/" test="abc" component={Login} />
        <Route  exact  path="/dashboard" component={Dashboard} />
        <Route  exact  path="/setting" component={Setting} />
        <Route  exact  path="/delay_setting" component={DelaySetting} />
        <Route  exact  path="/autoresponder" component={AutoResponder} />
        <Route  exact  path="/autorespondercreate" component={AutoResponderCreate} />
        <Route  exact  path="/autoresponderedit/:idfy"  component={AutoResponderEdit} />
        <Route  exact  path="/forgetPassword" component={ForgotPassword} />
        <Route  exact  path="/logout"  component={Logout} />
        </Switch>
      </Container>
    </Suspense>
  );
};
export default withRouter(AppRoute);
