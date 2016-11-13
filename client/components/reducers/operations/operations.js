import { INSERT, UPDATE, DELETE } from "./operations.constants";
const initialState = JSON.parse(localStorage.getItem("operations") || "{}");

const saveAndReturn = (state) => {
  localStorage.setItem("operations",JSON.stringify(state));
  return state;
};

export default (state = initialState, action) => {
  const result = Object.assign({}, state);
  // Check model of the operation
  if (action.operation && !action.operation.uuid) {
    return state;
  }
  switch(action.type) {
    case INSERT :
    case UPDATE :
    case DELETE :
      result[action.operation.uuid] = action.operation;
      return saveAndReturn(result);
    default : return state;
  }
};
