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
      window.location.href = "/api/auth/connect/" + this.printName();
    }
  };

  handleReconnect = event => {
    event.preventDefault();
    event.stopPropagation();
    event.target.style.display = "none";
    document.getElementById(
      this.printName() + "-disconnect_btn"
    ).style.display =
      "default";

    let profile = this.props.profile;
    if (!profile || (profile.token === undefined || profile.token === null)) {
      window.location.href = "/api/auth/connect/" + this.printName();
    }
  };

  handleDisconnect = event => {
    event.preventDefault();
    event.stopPropagation();
    event.target.style.display = "none";
    document.getElementById(this.printName() + "-reconnect_btn").style.display =
      "default";
    window.location.href = "/api/auth/disconnect/" + this.printName();
  };

  toggleOn = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.toggleAccount(this.printName(), true, this.props.profile._id);
    document
      .getElementById(this.printName() + "-button")
      .classList.remove("btn-danger");
    document
      .getElementById(this.printName() + "-button")
      .classList.add("btn-success");
  };

  toggleOff = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.toggleAccount(this.printName(), false, this.props.profile._id);
    document
      .getElementById(this.printName() + "-button")
      .classList.remove("btn-success");
    document
      .getElementById(this.printName() + "-button")
      .classList.add("btn-danger");
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
        className={
          "text-left p-1 border border-right-0 round-right-0 btn " + buttonMode
        }
        onClick={this.handleClick}
      >
        <span className={"fa fa-lg fa-" + this.printName()}>
          {this.props.profile ? this.props.profile.name : this.printName()}
        </span>
        {this.props.login ? null : (
          <div
            className="btn-group btn-group-toggle float-right p-1"
            data-toggle="buttons"
            id={this.printName() + "-on_toggle"}
            style={{ width: "auto" }}
          >
            <label
              className="btn btn-xs btn-light active text-success"
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
              className="btn btn-xs btn-light text-dark"
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
              className="btn btn-xs btn-danger"
              style={{
                display: buttonMode === "btn-danger" ? "none" : "default"
              }}
              onClick={this.handleDisconnect}
              id={this.printName() + "-disconnect_btn"}
              title="Disconnect Account"
            >
              X
            </span>
            <span
              className="btn btn-xs btn-success"
              style={{
                display: buttonMode === "btn-success" ? "none" : "default"
              }}
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
