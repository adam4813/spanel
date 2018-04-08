import React, { Component } from "react";

import GoogleLogin from "./login/GoogleLogin";
import FacebookLogin from "./login/FacebookLogin";
import TwitterLogin from "./login/TwitterLogin";
import TwitchLogin from "./login/TwitchLogin";
import AddAccount from "./login/AddAccount";

class AccountList extends Component {
  render() {
    return (
      <div className="col col-6">
        <div id="account-list-header">Account List =</div>
        <div className="btn-toolbar" id="account-list" role="toolbar">
          <div className="btn-group-vertical w-100" role="group">
            <GoogleLogin
              {...this.props.profile}
              toggleAccount={this.props.toggleAccount}
            />
            <FacebookLogin
              {...this.props.profile}
              toggleAccount={this.props.toggleAccount}
            />
            <TwitterLogin
              {...this.props.profile}
              toggleAccount={this.props.toggleAccount}
            />
            <TwitchLogin
              {...this.props.profile}
              toggleAccount={this.props.toggleAccount}
            />
          </div>
        </div>
        <AddAccount />
      </div>
    );
  }
}

export default AccountList;
