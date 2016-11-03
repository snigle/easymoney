import { INSERT, UPDATE, DELETE } from "./operations.constants";
const initialState = JSON.parse(localStorage.getItem("operations") || "{}");

const saveAndReturn = (state) => {
  localStorage.setItem("operations",JSON.stringify(state));
  return state;
};

export default (state = initialState, action) => {
  const result = Object.assign({}, state);
  switch(action.type) {
    case INSERT :
    case UPDATE :
      result[action.operation.uuid] = action.operation;
      return saveAndReturn(result);
    case DELETE :
      result[action.operation.uuid].deleted = true;
      return saveAndReturn(result);
    default : return state;
  }
};
