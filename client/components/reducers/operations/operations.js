import { INSERT, UPDATE, DELETE, UPDATE_ALL } from "./operations.constants";
import moment from "moment";
import _ from "lodash";

// Take data from localStorage
const years = JSON.parse(localStorage.getItem("years") || `["${moment().year()}"]`);
const initialState = {};
_.forEach(years, (year) => {
  const data = JSON.parse(localStorage.getItem(`operations_${year}`) || "{}");
  _.forEach(data, (operation) => { initialState[operation.uuid] = operation; });
});

const saveAndReturn = (state) => {
  // Clean local storage
  const years = JSON.parse(localStorage.getItem("years") || `["${moment().year()}"]`);
  _.forEach(years, (year) => localStorage.removeItem(`operations_${year}`));
  // Remove old data
  const limit = moment().add(-3,"years");
  const data = _.values(state).filter((operation) => (moment(operation.date).isAfter(limit)));
  const operationPerYear = _.groupBy(data, (operation) => moment(operation.date).year());
  _.forEach(operationPerYear, (operations,year) => {
    localStorage.setItem(`operations_${year}`,JSON.stringify(operations));
  });
  localStorage.setItem(`years`,JSON.stringify(_.keys(operationPerYear)));
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
    case UPDATE_ALL :
      _.forEach(action.operations, (operation) => {
        if (operation.uuid) {
          result[operation.uuid] = operation;
        }
      });
      return saveAndReturn(result);
    default : return state;
  }
};
