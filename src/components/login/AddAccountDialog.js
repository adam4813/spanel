import React, { Component } from "react";
import Modal from "react-modal";

import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FacebookLogin";
import TwitterLogin from "./TwitterLogin";
import TwitchLogin from "./TwitchLogin";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class AddAccountDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: props.modalIsOpen
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalIsOpen: nextProps.modalIsOpen
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById("root")}
      >
        <h2 ref={subtitle => (this.subtitle = subtitle)}>Add Accont</h2>
        <div className="btn-toolbar" id="account-list" role="toolbar">
          <div className="btn-group-vertical" role="group">
            <GoogleLogin />
            <FacebookLogin />
            <TwitterLogin />
            <TwitchLogin />
          </div>
        </div>
        <button onClick={this.closeModal}>Cancel</button>
      </Modal>
    );
  }
}

export default AddAccountDialog;
