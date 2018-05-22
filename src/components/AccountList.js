import React, { Component } from "react";

import GoogleLogin from "./login/GoogleLogin";
import FacebookLogin from "./login/FacebookLogin";
import TwitterLogin from "./login/TwitterLogin";
import TwitchLogin from "./login/TwitchLogin";
import AddAccount from "./login/AddAccount";

class AccountList extends Component {
  providers = {
    google: GoogleLogin,
    facebook: FacebookLogin,
    twitter: TwitterLogin,
    twitch: TwitchLogin
  };

  renderAccontList() { }

  render() {
    if (this.props.profile === undefined) {
      return null;
    } else {
      return (
        <div className="col col-6">
          <div id="account-list-header">Account List =</div>
          <div className="btn-toolbar" id="account-list" role="toolbar">
            <div className="btn-group-vertical w-100" role="group">
              {this.props.profile.accounts.map((Item, index) => {
                const Button = this.providers[Item.provider];
                return (
                  <Button
                    key={index}
                    profile={Item}
                    toggleAccount={this.props.toggleAccount}
                  />
                );
              })}
            </div>
          </div>
          <AddAccount />
        </div>
      );
    }
  }
}

export default AccountList;
