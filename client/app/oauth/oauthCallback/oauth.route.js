import React from "react"; // eslint-disable-line no-unused-vars
import { Route } from "react-router";
import Oauth from "./oauth";

export default (
  <div>
    <Route path="oauth/:previousURI" component={Oauth} />
    <Route path="*state=drive*" component={Oauth} />
  </div>
);
