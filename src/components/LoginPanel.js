import React, { Component } from "react";

class LoginPanel extends Component {
  render() {
    return <div className="col col-md-auto">{this.props.children}</div>;
  }
}

export default LoginPanel;
