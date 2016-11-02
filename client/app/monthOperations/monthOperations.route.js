import React from "react"; // eslint-disable-line no-unused-vars
import { Route } from "react-router";
import MonthOperations from "./monthOperations";
import OperationFormRoute from "./operationForm/operationForm.route";

export default (
  <div>
    <Route path="monthOperations" component={MonthOperations} />
    {OperationFormRoute}
  </div>);
