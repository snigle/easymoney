import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { increase, decrease } from "../../components/reducers/counter/counter.actions";
require("./home.less");

const Home = ({ number, increase, decrease }) => (
    <div id="home">
      Some state changes:
      {number}
      <button onClick={() => increase(1)}>Increase</button>
      <button onClick={() => decrease(1)}>Decrease</button>
    </div>
);

export default connect(
  (state) => ({ number: state.counter.number }),
  { increase, decrease }
)(Home);
