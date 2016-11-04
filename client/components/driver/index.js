import google from "./google";

const drivers = { google : google };

const getDriver = (driverName) => {
  let driver = drivers[driverName];
  if (!driver) {
    throw `oauth type ${driverName} is not mapped to a driver`;
  }
  return driver;
};

const getURL = (login) => {
  return getDriver(login.driver).getURL(login);
};

const getLogin = (pathname, login) => {
  return getDriver(login.driver).getLogin(pathname, login);
};

const download = (login, filename) => {
  return getDriver(login.driver).download(login, filename);
};

const upload = (login, filename, json) => {
  return getDriver(login.driver).upload(login, filename, json);
};

const getRouteMatches = () => Object.keys(drivers).map((key) => drivers[key].getMatchURL);

export default {
  getURL : getURL,
  getRouteMatches : getRouteMatches,
  getLogin : getLogin,
  download : download,
  upload : upload,
};
