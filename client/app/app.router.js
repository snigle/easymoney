import React from "react"; // eslint-disable-line no-unused-vars
import { Route } from "react-router";

import App from "./app";
import HomeRoute from "./home/home.route";
import FooRoute from "./foo/foo.route";
import GenerateDataRoute from "./generateData/generateData.route";
import MonthOperations from "./monthOperations/monthOperations.route";
import Wallet from "./wallet/wallet.route";
import OauthRoute from "./oauth/oauthCallback/oauthCallback.route";
import WalletForm from "./wallet/walletForm/walletForm.route";

export default (
  <Route path="/" component={App}>
    {HomeRoute}
    {FooRoute}
    {MonthOperations}
    {GenerateDataRoute}
    {OauthRoute}
    {Wallet}
    {WalletForm}
  </Route>
);

// NOTE [Create new module]
// Include the route file here or in the parent route of your module
// Include your module in your route file
