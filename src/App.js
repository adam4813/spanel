import React, { Component } from "react";
import "./App.css";

import MessageBox from "./components/MessageBox";
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
    let baseMessage = this.state.message;
    let messageList = {};
    for (let i = 0; i < this.state.activeAccounts.length; i++) {
      let providerName = this.state.profile.accounts.find(item => {
        return item._id === this.state.activeAccounts[i];
      }).provider;
      let appendMessage = document.getElementById(providerName + "-append")
        .value;
      messageList[this.state.activeAccounts[i]] =
        baseMessage + " " + appendMessage;
    }
    var data = {
      messageList: messageList,
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

  messageUpdated = msg => {
    this.setState(state => {
      return { message: msg };
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
          className="row justify-content-center"
          style={{ fontSize: "xx-large", fontWeight: "bold" }}
        >
          REVERBER
        </div>
        {this.state.profile ? (
          <div className="whole-screen">
            <div className="row justify-content-center p-5">
              <MessageBox
                {...this.state}
                messageUpdated={this.messageUpdated}
              />
            </div>
            <div className="row justify-content-center">
              <AccountList {...this.state} toggleAccount={this.toggleAccount} />
            </div>
            <div className="row justify-content-center">
              <button
                className="col-auto btn btn-lg btn-dark"
                onClick={this.handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="row justify-content-center"
              style={{ fontSize: "x-large", fontWeight: "bold" }}
            >
              Please Login
            </div>
            <div className="row justify-content-center">
              <ProviderList />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
