import React from "react"; // eslint-disable-line no-unused-vars
import { Route } from "react-router";
import WalletForm from "./walletForm";

export default (<div>
  <Route path="walletForm/:walletID" component={WalletForm} />
  <Route path="walletForm" component={WalletForm} />
</div>);
