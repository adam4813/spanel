import React, { Component } from "react";

class List extends Component {
  render() {
    return (
      <div>
        List:<br />
        {this.props.list.map((item, index) => {
          return (
            <span key={index}>
              {item} <br />
            </span>
          );
        })}
      </div>
    );
  }
}

export default List;
