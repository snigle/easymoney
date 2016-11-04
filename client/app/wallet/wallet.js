import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { hashHistory } from "react-router";

import { IconButton } from "material-ui";
import NavigationClose from "material-ui/svg-icons/navigation/close";

import WalletItem from "./walletItem/walletItem";

require("./wallet.less");

class Wallet extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div>
        <IconButton onClick={hashHistory.goBack}><NavigationClose /></IconButton>
        <div id="wallet">
            <WalletItem icon="credit-card" title="Wallet Test" initialTotal={42} currency="EUR"/>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    wallets : state.wallets
   }),
  { }
)(Wallet);
