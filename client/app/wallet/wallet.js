import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { browserHistory, Link } from "react-router";
import _ from "lodash";

import { IconButton, Paper, AppBar, FlatButton } from "material-ui";
import NavigationClose from "material-ui/svg-icons/navigation/close";

import WalletItem from "./walletItem/walletItem";

require("./wallet.less");

class Wallet extends React.Component {
  constructor(props) {
      super(props);

      const walletItemsSorted = _.sortBy(props.wallets, "name");

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
            <IconButton onClick={browserHistory.goBack}><NavigationClose /></IconButton>
          }
          iconElementRight={
            <FlatButton containerElement={<Link to="/walletForm" />} label="Add"/>
            }
        />
        <div className="appBody">
          {
            /* Display each wallet added by users*/
            this.state.wallets.map((currentWallet) => (
              <WalletItem key={currentWallet.uuid} icon={currentWallet.icon} name={currentWallet.name} initialTotal={_.reduce(currentWallet.totalPerYear, (res,o) => (res + o), 0)} currency="EUR"
              onClick={() => browserHistory.push(`wallets/${currentWallet.uuid}/operations/2016-11-01/2016-12-01`)}/>
            ))
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
