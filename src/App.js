import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import OverviewList from "./containers/OverviewList";
import LoginPanel from "./components/LoginPanel";
import GoogleLogin from "./components/login/GoogleLogin";
import FacebookLogin from "./components/login/FacebookLogin";
import TwitterLogin from "./components/login/TwitterLogin";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="row">
            <div className="col-sm-2">
              <LoginPanel name="Google"><GoogleLogin /></LoginPanel>
            </div>
            <div className="col-sm-2">
              <LoginPanel name="Facebook"><FacebookLogin /></LoginPanel>
            </div>
            <div className="col-sm-2">
              <LoginPanel name="Facebook"><TwitterLogin /></LoginPanel>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
