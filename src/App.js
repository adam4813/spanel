import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import OverviewList from "./containers/OverviewList";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <OverviewList {...this.state} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
