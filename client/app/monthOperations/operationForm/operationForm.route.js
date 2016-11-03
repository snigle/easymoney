import React from "react"; // eslint-disable-line no-unused-vars
import { Route } from "react-router";
import OperationForm from "./operationForm";

export default (<div>
  <Route path="operationForm/:operationID" component={OperationForm} />
  <Route path="operationForm" component={OperationForm} />
</div>);
