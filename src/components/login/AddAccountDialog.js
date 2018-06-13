import React, { Component } from "react";
import Modal from "react-modal";

import ProviderList from "../ProviderList";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    paddingRight: "30px",
    paddingLeft: "30px"
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
        <div
          className="row justify-content-center"
          style={{ fontSize: "x-large", fontWeight: "bold" }}
        >
          <span ref={subtitle => (this.subtitle = subtitle)}>Add Accont</span>
        </div>
        <div className="row justify-content-center">
          <ProviderList />
        </div>
        <div className="row justify-content-center">
          <button onClick={this.closeModal}>Cancel</button>
        </div>
      </Modal>
    );
  }
}

export default AddAccountDialog;
