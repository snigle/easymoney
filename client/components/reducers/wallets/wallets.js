import { INSERT, UPDATE, DELETE } from "./wallets.constants";
const initialState = JSON.parse(localStorage.getItem("wallets") || "{}");

const saveAndReturn = (state) => {
  localStorage.setItem("wallets",JSON.stringify(state));
  return state;
};

export default (state = initialState, action) => {
  const result = Object.assign({}, state);

  switch(action.type) {
    case INSERT :
    case UPDATE :
      result[action.wallet.uuid] = action.wallet;
      return saveAndReturn(result);
    case DELETE :
      result[action.wallet.uuid].deleted = true;
      return saveAndReturn(result);
    default : return state;
  }
};
