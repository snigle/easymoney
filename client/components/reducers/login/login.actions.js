import { SET_LOGIN } from "./login.constants";

export let setLogin = (n) => ({
    type: SET_LOGIN,
    login: n
});
