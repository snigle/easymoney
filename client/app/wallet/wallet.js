import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";

import WalletItem from "./walletItem/walletItem";

require("./wallet.less");

const Wallet = ({ operations }) => {
  return (
      <div id="wallet">
          <WalletItem icon="credit-card" title="Wallet Test" initialTotal={42} currency="EUR"/>
      </div>
  );
};

export default connect(
  {}
)(Wallet);
