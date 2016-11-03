import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { setLogin } from "../../components/reducers/login/login.actions";
import OauthDriver from "../../components/oauth/driver";

class Oauth extends React.Component {
  constructor(props) {
    super(props);
  }

  checkLogin() {
    const login = this.props.login;
    if (login.type) {
      let url = OauthDriver.getURL(login, this.props.location.pathname);
      window.location = url;
    }
  }

  componentDidMount() {
    //First load, we check if we need to generate a new access token
    console.log("mount oauth", this.props.login);
    this.checkLogin();
  }

  componentDidUpdate() {
    console.log("update oauth", this.props.login);
    this.checkLogin();
  }

  render() {
    return null;
  }
}

export default connect(
  (state) => ({ login: state.login }),
  { setLogin }
)(Oauth);
