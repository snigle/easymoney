import google from "./google";

const drivers = { google : google };

const getURL = (login) => {
  let driver = drivers[login.driver];
  if (!driver) {
    throw `oauth type ${login.driver} is not mapped to a driver`;
  }
  return driver.getURL(login);
};

const getLogin = (pathname, login) => {
  let driver = drivers[login.driver];
  if (!driver) {
    throw `oauth type ${login.driver} is not mapped to a driver`;
  }
  return driver.getLogin(pathname, login);
};

const getRouteMatches = () => Object.keys(drivers).map((key) => drivers[key].getMatchURL);

export default {
  getURL : getURL,
  getRouteMatches : getRouteMatches,
  getLogin : getLogin
};
