import React from "react"; // eslint-disable-line no-unused-vars
import { FormattedNumber } from "react-intl";

require("./walletItem.less");

const WalletItem = (props) => (
  <div id="walletItem" className="table" onClick={props.onClick}>
    <div className="tr">
      <div className="icon td">
        <i><i className={`fa fa-${props.icon}`}></i></i>
      </div>

      <div className="description td">
        <h4 className="title">
          {props.title}
        </h4>
      </div>


      <div className="initialTotal td">
        <FormattedNumber
          value={props.initialTotal}
          style="currency"
          currency={props.currency} />
      </div>
    </div>
  </div>
);

export default WalletItem;
