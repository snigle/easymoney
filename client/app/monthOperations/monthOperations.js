import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { hashHistory, Link } from "react-router";
import _ from "lodash";
import moment from "moment";

import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

import Operation from "./operation/operation";

require("./monthOperations.less");

const MonthOperations = ({ operations }) => {
  //Get this value from wallet
  let currentSum = 100.0;
  console.log("ordered",operations);
  return (
    <div id="monthOperations">
      <h2>Wallet **** :</h2>
        {
          _.map(operations, ([day,operations]) => (
            <div key={day}>
              <div className="day">{moment(day, "YYYY-MM-DD").format("DD MMMM YYYY")}</div>
              <div>{ operations.map((operation) => {
                  currentSum += operation.value;
                  return(
                    <Operation key={operation.uuid}
                      currency="EUR"
                      price={operation.value || 0}
                      currentTotal={currentSum}
                      category="Restaurant"
                      icon="cutlery"
                      color="lightgreen"
                      title={operation.title}
                      onClick={() => hashHistory.push(`/operationForm/${operation.uuid}`)}/>
                  );
                })}
              </div>
            </div>)
          )
        }
        <div className="add"><Link to="/operationForm"><i className="fa fa-plus"></i></Link></div>
          <RaisedButton label="Default" />
            <FloatingActionButton>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  );
};
export default connect(
  (state) => ({
    operations: _.sortBy(_.toPairs(_.groupBy(_.values(state.operations), "date")), ([date, operations]) => date)
  }),
  { }
)(MonthOperations);
