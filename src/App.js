import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import PostBox from "./components/PostBox";
import AccountList from "./components/AccountList";

class App extends Component {
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
            <AccountList {...this.state} />
          </div>
          <div className="row">
            <div className="col col-2">content</div>
            <div className="col align-self-end">
              <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Send" />
              </form>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
