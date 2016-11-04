import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { browserHistory, Link } from "react-router";
import { increase, decrease } from "../../components/reducers/counter/counter.actions";
import { signIn } from "../../components/reducers/login/login.actions";
require("./home.less");

const Home = ({ number, increase, decrease, signIn }) => (
<div>
  <header>
    Links:
    {" "}
    <Link to="/">Home</Link>
    {" "}
    <Link to="/foo">Foo</Link>
    {" "}
    <Link to="/operationForm">Operation Form</Link>
    {" "}
    <Link to="/monthOperations">Operations</Link>
    {" "}
    <Link to="/generateData">generateData</Link>
    {" "}
    <a onClick={() => signIn("google")}>Oauth</a>
  </header>
  <div>
    <button onClick={() => browserHistory.push("/foo")}>Go to /foo</button>
  </div>
    <div id="home">
      Some state changes:
      {number}
      <button onClick={() => increase(1)}>Increase</button>
      <button onClick={() => decrease(1)}>Decrease</button>
    </div>
</div>
);
export default connect(
  (state) => ({ number : state.counter.number, login : state.login }),
  { increase, decrease, signIn }
)(Home);
