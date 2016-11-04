import { createDevTools } from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";

import React from "react"; // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";

import * as reducers from "./client/components/reducers";
import AppRouter from "./client/app/app.router";

const reducer = combineReducers({
    ...reducers,
    routing : routerReducer,
});

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);

const store = createStore(
  reducer,
  DevTools.instrument()
);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        {AppRouter}
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById("mount")
);
