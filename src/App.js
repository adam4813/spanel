import React, { Component } from "react";
import "./App.css";

import MessageDialogArea from "./components/MessageDialogArea";
import AccountList from "./components/AccountList";
import ProviderList from "./components/ProviderList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    let accountPostList = this.state.activeAccounts
      ? this.state.activeAccounts
      : [];
    var data = {
      message: document.getElementById("post-message").value,
      accounts: accountPostList
    };
    fetch("/api/social/post", {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        return;
      }
    });
  };

  toggleAccount = (account, active, accountId) => {
    this.setState(state => {
      var activeAccounts;
      if (active) {
        const index = state.activeAccounts.findIndex(
          element => element === accountId
        );
        if (index === -1) {
          activeAccounts = [...state.activeAccounts, accountId];
        }
      } else {
        const index = state.activeAccounts.findIndex(
          element => element === accountId
        );
        activeAccounts = [
          ...state.activeAccounts.slice(0, index),
          ...state.activeAccounts.slice(index + 1)
        ];
      }
      return {
        activeAccounts: activeAccounts
          ? activeAccounts
          : [...state.activeAccounts]
      };
    });
  };

  componentWillMount() {
    fetch("/api/profile", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        let activeAccounts = [];
        if (data) {
          for (let index in data.accounts) {
            const account = data.accounts[index];
            activeAccounts.push(account._id);
          }
        }
        this.setState({ activeAccounts: activeAccounts, profile: data });
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <div
          className="bg-dark row justify-content-center text-light"
          style={{ fontSize: "xx-large", fontWeight: "bold" }}
        >
          Social Media Cross Poster
        </div>
        {this.state.profile ? (
          <div className="row whole-screen">
            <AccountList {...this.state} toggleAccount={this.toggleAccount} />
            <div className="col">
              <MessageDialogArea />
            </div>
            <div className="col col-auto bg-light">
              <div className="row justify-content-center h-100 align-items-center">
                <div className="col">
                  <button
                    className="btn btn-lg btn-block btn-dark"
                    onClick={this.handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="row justify-content-center"
            style={{ fontSize: "x-large" }}
          >
            Please Login
            <div class="w-100" />
            <ProviderList />
          </div>
        )}
      </div>
    );
  }
}

export default App;
