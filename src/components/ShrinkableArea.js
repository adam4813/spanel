import { Component } from "react";

class ShrinkableArea extends Component {
  constructor(props, areaID, buttonID, height) {
    super(props);
    this.state = {
      areaID: areaID,
      buttonID: buttonID,
      shrunkHeight: height
    };
  }
  shrinkArea = event => {
    event.preventDefault();
    document.getElementById(
      this.state.areaID
    ).style.height = this.state.shrunkHeight;
    let button = document.getElementById(this.state.buttonID);
    button.style.opacity = "0";
    button.style.visibility = "hidden";
    button.addEventListener(
      "transitionend",
      function(event) {
        button.style.display = "none";
      },
      false
    );
  };
}

export default ShrinkableArea;
