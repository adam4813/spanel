import React, { Component } from "react";

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.props.messageUpdated(e.target.value);
    this.setState({ message: e.target.value });
  };

  render() {
    return (
      <div className="message-box" id="primary-message-box">
        <label>
          Message&nbsp;
          <input
            type="test"
            name="message"
            value={this.state.message}
            id="post-message"
            onChange={this.handleChange}
          />
        </label>
      </div>
    );
  }
}

export default MessageBox;
