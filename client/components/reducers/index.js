export counter from "./counter/counter";
export operations from "./operations/operations";

// NOTE [Create new reducer]
// Include new reducers here, it permits to app.js to include all reducers in once

// Files used by a reducer :
//
// <reducerName>/<reducerName>.actions.js
// -----contains functions called by web components (html)
// <reducerName>/<reducerName>.constants.js
// -----contains constants used to send event
// <reducerName>/<reducerName>.js
// -----receive event and update the state
