import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { hashHistory, Link } from "react-router";
import _ from "lodash";

import { IconButton, Paper, AppBar, FlatButton } from "material-ui";
import NavigationClose from "material-ui/svg-icons/navigation/close";

import WalletItem from "./walletItem/walletItem";

require("./wallet.less");

class Wallet extends React.Component {
  constructor(props) {
      super(props);

      const walletItemsSorted = _.sortBy(props.wallets, function(obj) {
        return obj.name;
      });

      this.state = {
        wallets : walletItemsSorted,
      };
  }

  render() {
    return (
      <Paper id="wallet">
        <AppBar
          className="appBar"
          title="My Wallets / Accounts"
          iconElementLeft={
            <IconButton onClick={hashHistory.goBack}><NavigationClose /></IconButton>
          }
          iconElementRight={
            <FlatButton containerElement={<Link to="/walletForm" />} label="Add"/>
            }
        />
        <div className="appBody element" id="scrollContainer">
          {
            /* Display each wallet added by users*/
            this.state.wallets.map((currentWallet) => {
              return <WalletItem key={currentWallet.uuid} icon={currentWallet.icon} name={currentWallet.name} initialTotal={currentWallet.initialTotal} currency="EUR"/>;
            })
          }
        </div>
      </Paper>
    );
  }
}

export default connect(
  (state) => ({
    wallets : state.wallets,
   }),
  { }
)(Wallet);
