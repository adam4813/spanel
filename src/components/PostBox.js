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
    var data = {
      message: this.state.message,
      accounts: ["facebook", "twitter", "twitch"]
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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Message:
            <input
              type="test"
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default PostBox;
