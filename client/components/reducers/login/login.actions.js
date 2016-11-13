import { REFRESH_TOKEN, SIGN_IN, LOGOUT, SET_LOGIN, SYNC } from "./login.constants";

export const signIn = (driver) => ({
    type : SIGN_IN,
    driver : driver,
});

export const refreshToken = (redirectURI) => ({
  type : REFRESH_TOKEN,
  redirectURI : redirectURI,
});

export const logout = () => ({
  type : LOGOUT,
});

export const sync = (sync) => ({
  type : SYNC,
  sync : sync,
});

export const setLogin = (id, expires, token) => ({
  type : SET_LOGIN,
  id : id,
  expires : expires,
  token : token,
});
