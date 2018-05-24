import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import PostArea from "./components/PostArea";
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
    })
      .then(response => {
        if (response.ok) {
          return;
        }
      })
      .then(data => {
        //this.setState({ profile: data });
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
        } else {
          console.log(response.toString());
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

  redirectForLogin(state, location) {
    if (!state.profile && location.pathname !== "/login") {
      return <Redirect to="/login" />;
    } else if (state.profile && location.pathname === "/login") {
      return <Redirect to="/" />;
    } else {
      return "";
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="whole-screen">
          <div
            className="bg-dark row justify-content-center text-light"
            style={{ fontSize: "xx-large", fontWeight: "bold" }}
          >
            Social Media Cross Poster
          </div>
          <Route
            path="/"
            render={({ location }) => {
              return this.redirectForLogin(this.state, location);
            }}
          />
          <Switch>
            <Route exact path="/">
              <div className="row whole-screen">
                <AccountList
                  {...this.state}
                  toggleAccount={this.toggleAccount}
                />
                <div className="col">
                  <PostArea />
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
            </Route>
            <Route exact path="/login">
              <ProviderList />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
