import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";

import WalletItem from "./walletItem/walletItem";

require("./wallet.less");

const Wallet = ({ operations }) => {
  return (
      <div id="wallet">
        I am wallet!
        <div id="walletitem">
          <WalletItem icon="credit-card" title="Wallet Test" initialTotal={42} currency="EUR"/>
        </div>
      </div>
  );
};

export default connect(
  (state) => ({ operations: state.operations }),
  {}
)(Wallet);
