import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
import { setSync, newSync } from "../../components/reducers/sync/sync.actions";
import { updateAll as updateOperations } from "../../components/reducers/operations/operations.actions";
import { updateAll as updateWallets, updateTotal as updateTotalWallets } from "../../components/reducers/wallets/wallets.actions";
import Driver from "../../components/driver";

class Oauth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { updates : {
      wallets : props.updateWallets,
      operations : props.updateOperations,
    },
   };
  }

  syncGeneric(collectionName, forceSync = false, fileName = collectionName, filter = (e) => e, update = this.state.updates[collectionName]) {
    const self = this;
    const login = this.props.login;
    //Get sync file
    Driver.download(login, "sync").then((sync) => {
      if (!forceSync && self.props.sync[fileName] && (self.props.sync[fileName] === sync[fileName])) {
        return null;
      }
      self.props.setSync(fileName, sync[fileName]);
      return Driver.download(login, fileName);
    }).then((collection) => {
      if(!collection){
        return null;
      }
      const uuids = _.uniq(_.concat(_.keys(collection),_.keys(filter(self.props[collectionName]))));
      //Update local data
      const toUpdate = _.filter(uuids, (uuid) => (
        !self.props[collectionName][uuid] || (
          collection[uuid] &&
          self.props[collectionName][uuid].lastUpdate < collection[uuid].lastUpdate
        )
      ));
      if (toUpdate.length) {
        //Stop syncing if there is update in the reducer
        let state = { ...self.state };
        state[fileName] = true;
        self.setState(state);
        update(_.map(toUpdate, uuid => collection[uuid]));
        //Stop syncing if there is update in the reducer
        state = { ...self.state };
        state[fileName] = false;
        self.setState(state);
      }
      if (forceSync) {
        Driver.upload(login, fileName, filter(self.props[collectionName]));
        self.props.newSync(fileName);
        return Driver.upload(login, "sync", self.props.sync);
      }

      return null;
    });

  }

  syncOperations(year, forceSync) {
    //TODO TO sync operation, must differenciate collection_name and file_name
    if (!this.state[`operations_${year}`]) {
      this.syncGeneric("operations", forceSync, `operations_${year}`, (operations) => _.pickBy(operations, o => moment(o.date).year() === year), this.state.updates.operations);
    }
  }

  componentDidUpdate(prevProps) {
    const self = this;
    if (!this.props.login.sync) {
      return;
    }
    // Not in oauth phase
    if (prevProps.login !== this.props.login && !this.props.login.force && !this.props.login.redirectURI) {
      const years = _.uniq(_.concat([moment().year()], _.map(_.values(self.props.operations), (o) => moment(o.date).year())));
      _.forEach(years, year =>  self.syncOperations(year,true));
      this.syncGeneric("wallets",true);
      return;
    }
    if (prevProps.operations !== this.props.operations) {
      // Get years where there is change
      const operationsChanged = _.filter(_.values(this.props.operations), (operation) => (
        prevProps.operations[operation.uuid] !== self.props.operations[operation.uuid]
        )
      );
      const years = _.uniq(_.map(operationsChanged, op => moment(op.date).year()));
      _.forEach(years, year =>  self.syncOperations(year, true));
    }
    if (prevProps.wallets !== this.props.wallets || prevProps.walletsOperations.wallets !== this.props.walletsOperations.wallets) {
      if (!this.state.wallets){
        this.syncGeneric("wallets",true);
      }
    }
  }

  componentDidMount() {
    const self = this;
    const now = (new Date()).getTime() / 1000;
    // Not in oauth phase
    if (now < this.props.login.expires && !this.props.login.force && !this.props.login.redirectURI) {
      const years = _.uniq(_.concat([moment().year()], _.map(_.values(self.props.operations), (o) => moment(o.date).year())));
      _.forEach(years, year =>  self.syncOperations(year,false));
      this.syncGeneric("wallets");
    }
  }

  render() {
    return null;
  }
}

export default connect(
  (state) => ({ login : state.login, operations : state.operations, sync : state.sync, wallets : state.wallets, walletsOperations : state.walletsOperations }),
  { setSync, newSync, updateOperations, updateWallets, updateTotalWallets }
)(Oauth);
