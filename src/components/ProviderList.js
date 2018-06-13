import React, { Component } from "react";

import GoogleLogin from "./login/GoogleLogin";
import FacebookLogin from "./login/FacebookLogin";
import TwitterLogin from "./login/TwitterLogin";
import TwitchLogin from "./login/TwitchLogin";

class ProviderList extends Component {
  providers = [GoogleLogin, FacebookLogin, TwitterLogin, TwitchLogin];

  render() {
    return (
      <div className="btn-toolbar" id="account-list" role="toolbar">
        <div className="btn-group-vertical" role="group">
          {this.providers.map((Item, index) => {
            return <Item key={index} login={true} />;
          })}
        </div>
      </div>
    );
  }
}

export default ProviderList;
