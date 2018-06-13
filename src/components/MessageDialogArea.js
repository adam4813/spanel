import React from "react";
import ShrinkableArea from "./ShrinkableArea";

import MessageBox from "./MessageBox";

class MessageDialogArea extends ShrinkableArea {
  constructor(props) {
    super(props, "post-area", "customize-button", "10vh");
  }

  render() {
    return (
      <div
        id="post-area"
        className="row justify-content-center flex-column align-items-center w-100 p-1"
      >
        <div className="row">
          <div className="col">
            <MessageBox />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button
              id="customize-button"
              className="btn btn-lg btn-block btn-dark"
              onClick={this.shrinkArea}
            >
              Customize
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageDialogArea;
