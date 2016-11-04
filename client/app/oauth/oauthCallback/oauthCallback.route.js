import React from "react"; // eslint-disable-line no-unused-vars
import { Route } from "react-router";
import OauthCallback from "./oauthCallback";
import driver from "../../../components/oauth/driver";
export default (
  <div>
    {
      driver.getRouteMatches().map((route,i) => <Route key={i} path={route} component={OauthCallback} />)
    }
  </div>
);
