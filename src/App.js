import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import PostBox from "./components/PostBox";

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
          <Header {...this.state} />
          <PostBox />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
