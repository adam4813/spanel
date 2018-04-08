import React, { Component } from "react";

class PostBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "New status."
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ message: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="col-auto">
        <label>
          Message:
          <input
            type="test"
            name="message"
            value={this.state.message}
            id="messageInputBox"
            onChange={this.handleChange}
          />
        </label>
      </div>
    );
  }
}

export default PostBox;
