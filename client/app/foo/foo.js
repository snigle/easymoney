import React from "react"; // eslint-disable-line no-unused-vars
import Operation from "../operation/operation";

require("./foo.less");

const Foo = () => (
  <div id="foo">
    <h2>Test Operation :</h2>
    <Operation currency="EUR" price={150.96} currentTotal={360.20} category="Restaurant" icon="bed" color="lightgreen" title="Mcdonald"/>
    </div>
);
export default Foo;
