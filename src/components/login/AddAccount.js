import React, { Component } from "react";
import AddAccountDialog from "./AddAccountDialog";

class AddAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
  }
  printName() {
    return "Add Account";
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  render() {
    return (
      <div>
        <AddAccountDialog modalIsOpen={this.state.modalIsOpen} />
        <button className="border btn btn-primary" onClick={this.openModal}>
          <span className="fa fa-2x fa-plus">&nbsp; {this.printName()}</span>
        </button>
      </div>
    );
  }
}

export default AddAccount;
