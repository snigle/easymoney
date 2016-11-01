import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";

require("./foo.less");

const Foo = ({ operations }) => {
  return (
  <div id="foo">
    Fooooo
  </div>
);
};
export default connect(
  (state) => ({ operations: state.operations }),
  { }
)(Foo);
