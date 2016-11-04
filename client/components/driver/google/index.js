import { GOOGLE_CLIENT_ID } from "../../../config/common.constants";

const getURL = (login) => {
  const redirect_uri = window.top ? window.location.origin : window.location.origin;
  let url = "https://accounts.google.com/o/oauth2/v2/auth?scope=" + encodeURIComponent("https://www.googleapis.com/auth/drive.appfolder email profile") + "&state=drive&redirect_uri=" + encodeURIComponent(redirect_uri + "/oauthCallback") + "&response_type=token&client_id=" + encodeURIComponent(GOOGLE_CLIENT_ID) + "&include_granted_scopes=true";
  if (login.id) {
    url += "&login_hint=" + encodeURIComponent(login.id);
  }
  return url;
};

const getMatchURL = "oauthCallback";

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
    return { token : access_token, id : json.email, expires : parseInt(json.exp,10) };
  });
};

const getFileFromName = (login, filename, noCache) => {
  let params = "spaces=appDataFolder";
  params += "&q=" + encodeURIComponent(`name='${filename.replace(/'/g, "\'")}'`);
  params += "&orderBy=createdTime desc";
  return fetch("https://www.googleapis.com/drive/v3/files?" + params, {
    headers : new Headers({
      "Authorization" : `Bearer ${login.token}`,
    }),
    cache : noCache ? "reload" : "force-cache",
  }).then(response => response.json())
  .then(json => !json.files.length ? null : json.files[0]);
};

const downloadFile = (login, id) => {
  return fetch("https://www.googleapis.com/drive/v3/files/" + encodeURIComponent(id) + "?alt=media", {
    headers : new Headers({
      "Authorization" : `Bearer ${login.token}`,
      "Accept" : "application/json",
    }),
  })
  .then(response => response.text())
  .then(text => text ? JSON.parse(text) : {});
};

const uploadFile = (login, id, json) => {
  return fetch("https://www.googleapis.com/upload/drive/v3/files/" + encodeURIComponent(id) + "?uploadType=media", {
    method : "PATCH",
    headers : new Headers({
      "Authorization" : `Bearer ${login.token}`,
      "Accept" : "application/json",
      "Content-Type" : "application/json",
    }),
    body : JSON.stringify(json),
  }).then(response => response.json());
};

const createFile = (login,filename) => {
  return fetch("https://content.googleapis.com/drive/v3/files", {
    method : "POST",
    headers : new Headers({
      "Authorization" : `Bearer ${login.token}`,
      "Accept" : "application/json",
      "Content-Type" : "application/json",
    }),
    body : JSON.stringify({
      name : filename,
      parents : ["appDataFolder"],
    }),
  })
  .then((response) => response.json())
  .then((json) => getFileFromName(login,filename,true));
};

const downloadFileSafe = (login, filename) => {
  //Check if file exist and get it's ID
  return getFileFromName(login,filename)
  .then(file => !file ? createFile(login,filename) : file)
  .then(file => downloadFile(login, file.id));
};

const uploadFileSafe = (login, filename, json) => {
  //Check if file exist and get it's ID
  return getFileFromName(login,filename)
  .then(file => !file ? createFile(login,filename) : file)
  .then(file => uploadFile(login, file.id, json));
};

export default {
  getURL : getURL, //Give url to redirect the user to enter login/password
  getMatchURL : getMatchURL, //Regex to match the callback url sent by google
  getLogin : getLogin, // Login object created from google answer
  download : downloadFileSafe, //Synchronise json file in the cloud
  upload : uploadFileSafe,
};
