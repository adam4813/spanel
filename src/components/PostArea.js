import React from "react";
import ShrinkableArea from "./ShrinkableArea";

import PostBox from "./PostBox";

class PostArea extends ShrinkableArea {
  constructor(props) {
    super(props, "post-area", "customize-button", "20vh");
  }

  render() {
    return (
      <div
        id="post-area"
        className="row justify-content-center align-items-center"
      >
        <PostBox />
        <button
          id="customize-button"
          className="btn btn-lg btn-block btn-dark"
          onClick={this.shrinkArea}
        >
          Customize
        </button>
      </div>
    );
  }
}

export default PostArea;