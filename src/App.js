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
      let activeAccounts = [...state.activeAccounts];
      if (active) {
        let i = state.activeAccounts.findIndex(element => {
          return element === accountId;
        });
        if (i === -1) {
          activeAccounts.push(accountId);
        }
      } else {
        let i = state.activeAccounts.findIndex(element => {
          return element === accountId;
        });
        activeAccounts = [
          ...state.activeAccounts.slice(0, i),
          ...state.activeAccounts.slice(i + 1)
        ];
      }
      return {
        activeAccounts: activeAccounts
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
        <div className="container whole-screen">
          <div
            className="row justify-content-center"
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
              <div>
                <PostArea />
                <hr />
                <div className="row justify-content-center">
                  <AccountList
                    {...this.state}
                    toggleAccount={this.toggleAccount}
                  />
                </div>
                <div className="row justify-content-center">
                  <div className="col col-6">
                    <button
                      className="btn btn-lg btn-block btn-dark"
                      onClick={this.handleSubmit}
                    >
                      Send
                    </button>
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
