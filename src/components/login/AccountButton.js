import React, { Component } from "react";

class AccountButton extends Component {
  printName() {
    return "base";
  }

  handleClick = event => {
    event.preventDefault();
    event.stopPropagation();

    let profile = this.props.profile;
    if (!profile || (profile.token === undefined || profile.token === null)) {
      window.location =
        "http://localhost:3001/auth/connect/" + this.printName();
    }
  };

  handleReconnect = event => {
    event.preventDefault();
    event.stopPropagation();
    event.target.style.display = "none";
    document.getElementById("google-disconnect_btn").style.display = "default";

    let profile = this.props.profile;
    if (!profile || (profile.token === undefined || profile.token === null)) {
      window.location =
        "http://localhost:3001/auth/connect/" + this.printName();
    }
  };

  handleDisconnect = event => {
    event.preventDefault();
    event.stopPropagation();
    event.target.style.display = "none";
    document.getElementById("google-reconnect_btn").style.display = "default";
    window.location =
      "http://localhost:3001/auth/disconnect/" + this.printName();
  };

  toggleOn = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.toggleAccount(this.printName(), true, this.props.profile._id);
    document.getElementById("google-button").classList.remove("btn-danger");
    document.getElementById("google-button").classList.add("btn-success");
  };

  toggleOff = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.toggleAccount(this.printName(), false, this.props.profile._id);
    document.getElementById("google-button").classList.remove("btn-success");
    document.getElementById("google-button").classList.add("btn-danger");
  };

  render() {
    let buttonMode = "btn-secondary";
    if (this.props.profile) {
      if (
        this.props.profile.token !== undefined &&
        this.props.profile.token !== null
      ) {
        buttonMode = "btn-success";
      } else {
        buttonMode = "btn-danger";
      }
    }
    return (
      <button
        id={this.printName() + "-button"}
        className={"text-left border btn " + buttonMode}
        onClick={this.handleClick}
      >
        <span className={"fa fa-2x fa-" + this.printName()}>
          &nbsp; {this.printName()}
        </span>
        {this.props.login ? null : (
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
              style={{ "display": buttonMode === "btn-danger" ? "none" : "default" }}
              onClick={this.handleDisconnect}
              id={this.printName() + "-disconnect_btn"}
              title="Disconnect Account"
            >
              X
            </span>
            <span
              className="btn btn-sm btn-success"
              style={{ "display": buttonMode === "btn-success" ? "none" : "default" }}
              onClick={this.handleReconnect}
              id={this.printName() + "-reconnect_btn"}
              title="Reconnect Account"
            >
              +
            </span>
          </div>
        )}
      </button>
    );
  }
}

export default AccountButton;
