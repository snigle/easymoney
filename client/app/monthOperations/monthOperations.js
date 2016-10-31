import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { hashHistory } from "react-router";
import Operation from "./operation/operation";

require("./monthOperations.less");

const MonthOperations = ({ operations }) => {
  let currentSum = 100.0;
  return (
  <div id="monthOperations">
    <h2>Test Operation :</h2>
    {
        Object.entries(operations).map(([uuid, operation]) => {
          currentSum += operation.value;
          return(
        <Operation key={uuid}
          currency="EUR"
          price={operation.value || 0}
          currentTotal={currentSum}
          category="Restaurant"
          icon="cutlery"
          color="lightgreen"
          title={operation.title}
          onClick={() => hashHistory.push(`/operationForm/${uuid}`)}/>
      );})
    }
  </div>
);
};
export default connect(
  (state) => ({ operations: state.operations }),
  { }
)(MonthOperations);
