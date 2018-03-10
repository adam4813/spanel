import React, { Component } from "react";

import LoginPanel from "./LoginPanel";
import GoogleLogin from "./login/GoogleLogin";
import FacebookLogin from "./login/FacebookLogin";
import TwitterLogin from "./login/TwitterLogin";

class Header extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <LoginPanel name="Google">
            <GoogleLogin {...this.props.profile} />
          </LoginPanel>
          <LoginPanel name="Facebook">
            <FacebookLogin {...this.props.profile} />
          </LoginPanel>
          <LoginPanel name="Twitter">
            <TwitterLogin {...this.props.profile} />
          </LoginPanel>
        </div>
      </div>
    );
  }
}

export default Header;
