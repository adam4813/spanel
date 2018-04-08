import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import PostBox from "./components/PostBox";
import AccountList from "./components/AccountList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: { facebook: true, twitter: true, twitch: true }
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    let accountPostList = [];
    for (var account in this.state.accounts) {
      if (this.state.accounts[account]) {
        accountPostList.push(account);
      }
    }
    var data = {
      message: document.getElementById("messageInputBox").value,
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
      .then(
        function(data) {
          this.setState({ profile: data });
        }.bind(this)
      );
  };

  toggleAccount = (account, value) => {
    this.setState(state => ({
      accounts: { ...state.accounts, [account]: value }
    }));
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
      .then(
        function(data) {
          this.setState({ profile: data });
        }.bind(this)
      );
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="row">
            <PostBox />
          </div>
          <div className="row">
            <AccountList {...this.state} toggleAccount={this.toggleAccount} />
          </div>
          <div className="row">
            <div className="col col-6">
              <button
                className="btn btn-lg btn-block btn-dark"
                onClick={this.handleSubmit}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
