import { SET_LOGIN } from "./login.constants";

const initialState = JSON.parse(localStorage.getItem("login") || "{}");

export default (state = initialState, action) => {
    if(action.type === SET_LOGIN) {
        return { ...action.login };
    }
    return state;
};
