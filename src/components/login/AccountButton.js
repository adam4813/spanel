import React, { Component } from "react";

class AccountButton extends Component {
  printName() {
    return "base";
  }

  handleClick = event => {
    event.preventDefault();
    event.stopPropagation();

    let profile = this.props[this.printName()];
    if (!profile || (profile.token === undefined || profile.token === null)) {
      window.location =
        "http://localhost:3001/auth/connect/" + this.printName();
    }
  };

  handleDisconnect = event => {
    event.preventDefault();
    event.stopPropagation();
    window.location =
      "http://localhost:3001/auth/disconnect/" + this.printName();
  };

  toggleOn = event => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
  };

  toggleOff = event => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
  };

  render() {
    let buttonMode = "btn-primary";
    let profile = this.props[this.printName()];
    if (profile) {
      if (profile.token !== undefined && profile.token !== null) {
        buttonMode = "btn-success";
      } else {
        buttonMode = "btn-danger";
      }
    }
    return (
      <button
        className={"text-left border btn " + buttonMode}
        onClick={this.handleClick}
      >
        <span className={"fa fa-2x fa-" + this.printName()}>
          &nbsp; {this.printName()}
        </span>
        <div
          className="btn-group btn-group-toggle float-right"
          data-toggle="buttons"
          id={this.printName() + "-on_toggle"}
          style={{ width: "auto" }}
        >
          <label
            className="btn btn-sm btn-light active text-success"
            onClick={this.toggleOn}
          >
            <input
              type="radio"
              name="options"
              id="option1"
              autoComplete="off"
              defaultChecked
            />
            ON
          </label>
          <label
            className="btn btn-sm btn-light text-dark"
            id={this.printName() + "-off_toggle"}
            onClick={this.toggleOff}
          >
            <input
              type="radio"
              name="options"
              id="option2"
              autoComplete="off"
            />
            OFF
          </label>
          <span
            className="btn btn-sm btn-danger"
            onClick={this.handleDisconnect}
            title="Disconnect Account"
          >
            X
          </span>
        </div>
      </button>
    );
  }
}

export default AccountButton;
