import { SET_SYNC, NEW_SYNC } from "./sync.constants";
import uuid from "node-uuid";
const initialState = JSON.parse(localStorage.getItem("sync") || "{}");

const saveAndReturn = (state) => {
  localStorage.setItem("sync",JSON.stringify(state));
  return state;
};

export default (state = initialState, action) => {
  const res = { ...state };
  switch(action.type){
    case SET_SYNC:
      res[action.filename] = action.uuid;
      return saveAndReturn(res);
    case NEW_SYNC:
      res[action.filename] = uuid.v4();
      return saveAndReturn(res);
  }
  return state;
};
