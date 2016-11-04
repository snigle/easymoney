import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { hashHistory } from "react-router";
import { setLogin } from "../../../components/reducers/login/login.actions";
import OauthDriver from "../../../components/oauth/driver";
class Oauth extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let self = this;
    OauthDriver.getLogin(this.props.location.pathname, this.props.login).then(function (login) {
      const redirect = self.props.login.redirectURI;
      self.props.setLogin(login.id, login.expires, login.token);
      if (!redirect) {
        hashHistory.push(redirect);
      }
    });
  }

  render() {
    return null;
  }
}

export default connect(
  (state) => ({ login : state.login }),
  { setLogin }
)(Oauth);
