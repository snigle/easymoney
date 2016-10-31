import React from "react"; // eslint-disable-line no-unused-vars
import { IntlProvider } from "react-intl";
import { Link, hashHistory } from "react-router";
require("./app.less");

import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
addLocaleData([...en, ...fr, ...es]);

const App = ({ children }) => (
  <IntlProvider locale={navigator.language || navigator.browserLanguage}>
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
      </header>
      <div>
        <button onClick={() => hashHistory.push("/foo")}>Go to /foo</button>
      </div>
      <div style={{ marginTop: "1.5em" }}>{children}</div>
    </div>
  </IntlProvider>
);

export default App;
