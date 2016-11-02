import React from "react"; // eslint-disable-line no-unused-vars
import { FormattedNumber } from "react-intl";
require("./operation.less");

const Operation = (props) => (
  <div id="operation" className="table" onClick={props.onClick}>
    <div className="tr">
      <div className="icon td">
        <i><i className={`fa fa-${props.icon}`}></i></i>
      </div>
      <div className="description td">
        <h4 className="title">
          {props.title}
        </h4>
        <div>{props.category}</div>
      </div>
      <div className="prices td">
        <div className={`price${props.price > 0 ? " income" : " outcome"}`}>
          <FormattedNumber
            value={props.price}
            style="currency"
            currency={props.currency} />
        </div>
        <div className="currentTotal">
          <FormattedNumber
            value={props.currentTotal}
            style="currency"
            currency={props.currency} />
        </div>
      </div>
    </div>
  </div>
);
export default Operation;
