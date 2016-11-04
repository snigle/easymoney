import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { hashHistory } from "react-router";

import { Paper, AppBar, IconButton, RaisedButton, TextField, SelectField, MenuItem } from "material-ui";
import NavigationClose from "material-ui/svg-icons/navigation/close";

import { insert, update, remove } from "../../../components/reducers/wallets/wallets.actions";

require("./walletForm.less");

class WalletForm extends React.Component {
  constructor(props) {
    super(props);
    console.log("wallet param", props);

    if(props.params.walletID) {
      const wallet = { ...props.wallets[props.params.walletID] };
      this.state = {
        wallet : {
          ...wallet
        },
      };
    } else {
      const currentYear = new Date().getFullYear();
      const totalPerYear = {};
      totalPerYear[currentYear] = 0.0;

      this.state = {
        wallet : {
          name : "",
          initialTotal : 0.0,
          currency : "EUR",
          icon : "test",
          totalPerYear : totalPerYear,
        }
      };
    }

    this.state.wallets = props.wallets;
    this.state.icons = [ { uuid : "test", name : "Credit Card", icon : "credit-card" }];
    this.state.open = false;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle functions required for React Form Management
  handleChange(event, value) {
    const state = { ...this.state, wallet : { ...this.state.wallet } };
    state.wallet[event.target.name] = value;
    this.setState(state);
  }

  handleChangeIcon(event, index, value) {
    this.setState({ ...this.state, icon : { ...this.state.icon, icon: value } });
  }

  handleSubmit(event) {
    if (this.state.wallet.uuid) {
      this.props.update(this.state.wallet);
    } else {
      this.props.insert(this.state.wallet);
    }
    hashHistory.goBack();
  }

  // Render function to display form
  render() {
    return(
      <Paper id="walletForm">
        <AppBar
          title={this.state.wallet.uuid ? "Edit wallet" : "Create a wallet"}
          iconElementLeft={
            <IconButton onClick={hashHistory.goBack}><NavigationClose /></IconButton>
          }
        />

      {/* Insertion Form for Wallet */}
        <form>
          <TextField
            floatingLabelText="Wallet name / Account name"
            name="name"
            hintText="Name"
            value={this.state.wallet.title}
            onChange={this.handleChange}
            fullWidth={true}
            floatingLabelFixed={true}
            />

          <SelectField value={this.state.wallet.icon}
            floatingLabelFixed={true}
            floatingLabelText="Icon"
            onChange={(e,i,v) => this.handleChangeIcon(e,i,v)} fullWidth={true}>
            {
              this.state.icons.map((icon) => (
                <MenuItem key={icon.uuid} value={icon.uuid} primaryText={icon.name}
                 />
              ))
            }
          </SelectField>

          {/* Submit buttons*/}
            <div className="row">
              <div className="col-sm-6 col-xs-6">
                <RaisedButton label="Save and Exit" primary={true} fullWidth={true} onClick={(e) => this.handleSubmit(e)}/>
              </div>
              <div className="col-sm-6 col-xs-6">
                <RaisedButton label="Save and Create New" primary={true} fullWidth={true} onClick={(e) => this.handleSubmit(e)}/>
              </div>
            </div>

        </form>
      </Paper>
    );
  }
}

export default connect(
  (state) => ({ wallets : state.wallets }),
  { insert, update, remove }
)(WalletForm);
