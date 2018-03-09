import React, { Component } from "react";

class Login extends Component {
  printName() {
    return "base";
  }

  render() {
    return (
      <div>
        <a href={"http://127.0.0.1:3001/auth/" + this.printName()}>Login with {this.printName()}!</a>
      </div>
    );
  }
}

export default Login;
