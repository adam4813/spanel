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

  renderAccontList() {}

  render() {
    if (this.props.profile === undefined) {
      return null;
    } else {
      return (
        <div
          className="bg-dark col col-auto pr-0"
          style={{ paddingTop: "10vh" }}
        >
          <div className="d-flex align-items-start flex-column h-75">
            <div className="mb-auto pl-2">
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
            </div>
            <div className="align-self-center">
              <AddAccount />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default AccountList;
