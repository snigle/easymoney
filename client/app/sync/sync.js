import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import _ from "lodash";
import { setSync, newSync } from "../../components/reducers/sync/sync.actions";
import { update as updateOperation } from "../../components/reducers/operations/operations.actions";
import Driver from "../../components/driver";

class Oauth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  syncOperations(forceSync) {
    const self = this;
    const login = this.props.login;
    //Get sync file
    Driver.download(login, "sync").then((sync) => {
      if (!forceSync && self.props.sync.operations && (self.props.sync.operations === sync.operations)) {
        return null;
      }
      self.props.setSync("operations", sync.operations);
      return Driver.download(login, "operations");
    }).then((operations) => {
      if(!operations){
        return null;
      }
      const uuids = _.uniq(_.concat(_.keys(operations),_.keys(self.props.operations)));

      //Update local data
      _.forEach(uuids, (uuid) => {
        if (!self.props.operations[uuid] || (operations[uuid] && self.props.operations[uuid].lastUpdate < operations[uuid].lastUpdate)) {
          //Stop syncing if there is update in the reducer
          self.setState({ ...self.state, operations : true });
          self.props.updateOperation(operations[uuid]);
          //Stop syncing if there is update in the reducer
          self.setState({ ...self.state, operations : false });
        }
      });

      if (forceSync) {
        Driver.upload(login, "operations", self.props.operations);
        self.props.newSync("operations");
        return Driver.upload(login, "sync", self.props.sync);
      }

      return null;
    });

  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.login.sync) {
      return;
    }
    if (nextProps.operations !== this.props.operations) {
      if (!this.state.operations){
        this.syncOperations(true);
      }
    }
  }

  componentDidMount() {
    if (!this.props.login.sync) {
      return;
    }
    this.syncOperations();

  }
  render() {
    return null;
  }
}

export default connect(
  (state) => ({ login : state.login, operations : state.operations, sync : state.sync }),
  { setSync, newSync, updateOperation }
)(Oauth);
