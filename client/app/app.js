import React from "react"; // eslint-disable-line no-unused-vars
import { IntlProvider } from "react-intl";

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

import Oauth from "./oauth/oauth";

require("./app.less");
const App = ({ children, location }) => (
  <MuiThemeProvider>
    <IntlProvider locale={navigator.language || navigator.browserLanguage}>
      <div>
        <Oauth />
        <div>{children}</div>
      </div>
    </IntlProvider>
  </MuiThemeProvider>
);

export default App;
