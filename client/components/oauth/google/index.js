import { GOOGLE_CLIENT_ID } from "../../../config/common.constants";
const getURL = (login, redirect) => {
  let url = "https://accounts.google.com/o/oauth2/v2/auth?scope=" + encodeURIComponent("https://www.googleapis.com/auth/drive.appfolder email profile") + "&state=drive&redirect_uri=" + encodeURIComponent(redirect) + "&response_type=token&client_id=" + encodeURIComponent(GOOGLE_CLIENT_ID) + "&include_granted_scopes=true";
  if (login.email) {
    url += "&login_hint=" + encodeURIComponent(login.email);
  }
  return url;
};

export const google = {
  getURL : getURL,
};
