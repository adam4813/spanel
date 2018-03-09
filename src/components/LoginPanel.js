import React, { Component } from "react";

class LoginPanel extends Component {
  render() {
    return (
      <div className="card text-white bg-secondary">
        <div className="card-body">
          <div className="card-title">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPanel;
