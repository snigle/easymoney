import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { refreshToken } from "../../components/reducers/login/login.actions";
import OauthDriver from "../../components/oauth/driver";

class Oauth extends React.Component {
  constructor(props) {
    super(props);
  }

  checkLogin() {
    const login = this.props.login;
    const now = (new Date()).getTime() / 1000;
    // If not logged or it's the callback called
    if (login === { } || login.redirectURI) {
      return;
    } // If force login ou token expired
    else if (login.force || now >= login.expires) {
      let url = OauthDriver.getURL(login);
      // Set redirectURI and redirect to sign in page
      this.props.refreshToken(this.props.routing.locationBeforeTransitions.pathname);
      if (window.top) {
        window.top.location.href = url;
      }
      window.location.href = url;
    }
  }

  componentDidMount() {
    //First load, we check if we need to generate a new access token
    this.checkLogin();
  }

  componentDidUpdate() {
    this.checkLogin();
  }

  render() {
    return null;
  }
}

export default connect(
  (state) => ({ login : state.login, routing : state.routing }),
  { refreshToken }
)(Oauth);
