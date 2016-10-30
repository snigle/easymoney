import React from "react"; // eslint-disable-line no-unused-vars
require("./operation.less");

const Operation = () => (
  <div id="operation" className="table">
    <div className="tr">
      <div className="icon td">
        <i className="fa fa-home"></i>
      </div>
      <div className="description td">
        <h4 class="title">
          Mcdonald
        </h4>
        <div>Restaurant</div>
      </div>
      <div className="prices td">
        <div className="price">
          -150,96 €
        </div>
        <div className="currentTotal">
          360,20 €
        </div>
      </div>
    </div>
  </div>
);
export default Operation;
