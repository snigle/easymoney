export counter from "./counter/counter";
export operations from "./operations/operations";
export login from "./login/login";
export wallets from "./wallets/wallets";
export sync from "./sync/sync";
export walletsOperations from "./walletsOperations/walletsOperations";
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
