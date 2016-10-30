import { Link, hashHistory } from "react-router";
require("./app.less");

const App = ({ children }) => (
  <div>
    <header>
      Links:
      {" "}
      <Link to="/">Home</Link>
      {" "}
      <Link to="/foo">Foo</Link>
      {" "}
      <Link to="/bar">Bar</Link>
    </header>
    <div>
      <button onClick={() => hashHistory.push("/foo")}>Go to /foo</button>
    </div>
    <div style={{ marginTop: "1.5em" }}>{children}</div>
  </div>
);

export default App;
