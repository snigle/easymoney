import { INSERT, UPDATE, DELETE, UPDATE_ALL } from "./wallets.constants";

import _ from "lodash";
const initialState = JSON.parse(localStorage.getItem("wallets") || "{}");

const saveAndReturn = (state) => {
  localStorage.setItem("wallets",JSON.stringify(state));
  return state;
};

export default (state = initialState, action) => {
  const result = Object.assign({}, state);
  if (action.wallet && !action.wallet.uuid) {
    return state;
  }
  switch(action.type) {
    case INSERT :
    case UPDATE :
    case DELETE :
      result[action.wallet.uuid] = action.wallet;
      return saveAndReturn(result);
    case UPDATE_ALL :
      _.forEach(action.wallets, (wallet) => {
        if (wallet.uuid) {
          result[wallet.uuid] = wallet;
        }
      });
      return saveAndReturn(result);
    default : return state;
  }
};
