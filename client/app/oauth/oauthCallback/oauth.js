import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { hashHistory } from "react-router";
import { setLogin } from "../../components/reducers/login/login.actions";

class Oauth extends React.Component {
  constructor(props) {
    super(props);
    console.log("history",props);
    const regex = /.*access_token=([^&]+)&.*/;
    const match = props.location.pathname.match(regex);
    console.log("match", match);
    if (!match){
      this.openPopup();
    } else if (match.length !== 2){
      console.error("no token");
    } else {
      this.state = { access_token : match[1] };
    }
  }

  openPopup() {
    console.log(this);
    this.props.setLogin({ redirect_uri : this.props.previousURI });
    setTimeout(() =>
    window.location = "https://accounts.google.com/o/oauth2/v2/auth?scope=" + encodeURIComponent("https://www.googleapis.com/auth/drive.appfolder email profile") + "&state=drive&redirect_uri=" + encodeURIComponent("http://localhost:8080/") + "&response_type=token&client_id=896727015937-03jkctj1nc3tcac0s8435198tnls0bjp.apps.googleusercontent.com&include_granted_scopes=true&login_hint=" + encodeURIComponent("snigle64@gmail.com") , 0);
  }

  componentDidMount() {
    let self = this;
      if (this.state && this.state.access_token) {
        console.log("get refresh token");
        fetch("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + this.state.access_token).then((response) => {
          console.log("response token",response);
          return response.json();
        }, (error) => {
          console.error("error",error);
        }).then((json) => {
          console.log("json",json);
          self.props.setLogin({ access_token : this.state.access_token, id : json.email, expires : json.expires_in });
          hashHistory.goTo(self.props.login.redirect_uri);
        });
      }
  }

  render() {
    return <div>OAuth</div>;
  }
}

export default connect(
  (state) => ({ login: state.login }),
  { setLogin }
)(Oauth);
