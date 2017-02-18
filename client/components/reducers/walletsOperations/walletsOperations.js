import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";
import _ from "lodash";
import moment from "moment";
import wallets from "../wallets/wallets";
import operations from "../operations/operations";
import { INSERT, UPDATE, DELETE, UPDATE_ALL } from "../operations/operations.constants";

const saveAndReturn = (state) => {
  localStorage.setItem("wallets",JSON.stringify(state.wallets));
  return state;
};

const updateTotal = (wallets, operationsChanged, operations) => {
  const walletUUIDs = _.uniqBy(
    _.map(operationsChanged, (o) => ({ uuid : o.walletUUID, year : moment(o.date).year() })),
    (e) => e.walletUUID + e.year);
  _.forEach(walletUUIDs, ({ uuid,year }) => {
    wallets[uuid].totalPerYear[year] = _.reduce(_.filter(operations, op => (!op.deleted && op.walletUUID === uuid && moment(op.date).year() === year)), (total, op) => (total + op.value), 0);
    wallets[uuid].lastUpdate = moment().toISOString();
  });
  return wallets;
};
export default reduceReducers(combineReducers({ wallets, operations }),
(state, action) => {
  const result = { wallets : { ...state.wallets }, operations : state.operations };

  switch(action.type) {
    case UPDATE_ALL :
      result.wallets = updateTotal(result.wallets, action.operations, state.operations);
      return saveAndReturn(result);
    case INSERT :
    case UPDATE :
    case DELETE :
      result.wallets = updateTotal(result.wallets, [action.operation], state.operations);
      return saveAndReturn(result);
    default : return state;
  }

  return state;
});
