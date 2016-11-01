import React from "react"; // eslint-disable-line no-unused-vars
import { IntlProvider } from "react-intl";
import { Link, hashHistory } from "react-router";

import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
addLocaleData([...en, ...fr, ...es]);

import moment from "moment";
moment.locale(navigator.language || navigator.browserLanguage);

const injectTapEventPlugin = require("react-tap-event-plugin");
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

require("./app.less");
const App = ({ children }) => (
  <MuiThemeProvider>
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
  </MuiThemeProvider>
);

export default App;
