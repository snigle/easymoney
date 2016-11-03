import google from "./google";

const drivers = { "google" : google };

const getURL = (login, redirect) => {
  let driver = drivers[login.type];
  if (!driver) {
    throw `oauth type ${login.type} is not mapped to a driver`;
  }
  driver.getURL(login,redirect);
};

export const OauthDriver = {
  getURL : getURL,
};
