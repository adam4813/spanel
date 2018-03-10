import React, { Component } from "react";

class Login extends Component {
  printName() {
    return "base";
  }

  render() {
    let buttonMode = "btn-primary";
    let profile = this.props[this.printName()];
    if (profile) {
      if (profile.token !== "") {
        buttonMode = "btn-success";
      } else {
        buttonMode = "btn-danger";
      }
    }
    return (
      <div>
        <a
          className={"btn " + buttonMode}
          href={"http://localhost:3001/auth/" + this.printName()}
          role="button"
        >
          <span className={"fa fa-2x fa-" + this.printName()}>
            &nbsp; {this.printName()}
          </span>
        </a>
      </div>
    );
  }
}

export default Login;
