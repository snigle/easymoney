import { GOOGLE_CLIENT_ID } from "../../../config/common.constants";

const getURL = (login) => {
  const redirect_uri = window.top ? window.location.origin + window.top.location.pathname : window.location.origin + window.location.pathname;
  let url = "https://accounts.google.com/o/oauth2/v2/auth?scope=" + encodeURIComponent("https://www.googleapis.com/auth/drive.appfolder email profile") + "&state=drive&redirect_uri=" + encodeURIComponent(redirect_uri) + "&response_type=token&client_id=" + encodeURIComponent(GOOGLE_CLIENT_ID) + "&include_granted_scopes=true";
  if (login.email) {
    url += "&login_hint=" + encodeURIComponent(login.email);
  }
  return url;
};

const getMatchURL = "*state=drive*";

const getLogin = (pathname, login) => {
  const regex = /.*access_token=([^&]+)&.*/;
  const match = pathname.match(regex);
  let access_token = "";
  if (!match){
   throw "can't get login : access_token not found";
  } else if (match.length !== 2){
    throw "can't get login : error when getting access_token";
  } else {
     access_token = match[1];
  }
  return fetch("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + access_token).then((response) => {
    return response.json();
  }, (error) => {
    throw error;
  }).then((json) => {
    if (json.aud !== GOOGLE_CLIENT_ID) {
      throw "google id doesn't correspond";
    }
    return { token : access_token, id : json.email, expires : json.exp };
  });
};
export default {
  getURL : getURL,
  getMatchURL : getMatchURL,
  getLogin : getLogin,
};
