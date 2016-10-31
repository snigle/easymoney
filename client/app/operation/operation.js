import React from "react"; // eslint-disable-line no-unused-vars
import { FormattedNumber } from "react-intl";
require("./operation.less");

const Operation = () => (
  <div id="operation" className="table">
    <div className="tr">
      <div className="icon td">
        <i><i className="fa fa-home"></i></i>
      </div>
      <div className="description td">
        <h4 className="title">
          Mcdonald
        </h4>
        <div>Restaurant</div>
      </div>
      <div className="prices td">
        <div className="price">
          <FormattedNumber
            value={150.96}
            style="currency"
            currency="EUR" />
        </div>
        <div className="currentTotal">
          360,20 €
        </div>
      </div>
    </div>
  </div>
);
export default Operation;
