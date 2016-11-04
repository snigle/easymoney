import { REFRESH_TOKEN, SIGN_IN, LOGOUT, SET_LOGIN } from "./login.constants";

const initialState = JSON.parse(localStorage.getItem("login") || "{}");

const saveAndReturn = (state) => {
  localStorage.setItem("login",JSON.stringify(state));
  return state;
};

export default (state = initialState, action) => {
  switch(action.type){
    case REFRESH_TOKEN :
      return saveAndReturn({ ...state, force : false, redirectURI : action.redirectURI });
    case SIGN_IN :
      return saveAndReturn({ force : true, driver : action.driver });
    case LOGOUT :
      return saveAndReturn({ });
    case SET_LOGIN :
      return saveAndReturn({ ...state, redirectURI : null, force : false, token : action.token, expires : action.expires, id : action.id });
  }
  return state;
};
