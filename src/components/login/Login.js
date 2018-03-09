import React, { Component } from "react";

class Login extends Component {
  printName() {
    return "base";
  }

  render() {
    return (
      <div>
        <span className={"fa fa-2x fa-" + this.printName()}></span>
        <a href={"http://localhost:3001/auth/" + this.printName()}>Login with {this.printName()}!</a>
      </div>
    );
  }
}

export default Login;
