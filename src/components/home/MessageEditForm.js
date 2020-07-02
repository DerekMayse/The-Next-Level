import React, { Component } from "react";
import { Form, Button, ButtonGroup } from "react-bootstrap";

class MessageEditForm extends Component {
  state = {
    messageText: this.props.message.message,
    loadingStatus: true,
  };

  handleEditFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };



  makeEditedMessage = () => {
    const editedMessage = {
      id: this.props.message.id,
      message: this.state.messageText,
      time: this.props.message.time,
    };

    this.props.handleUpdate(editedMessage);
  };

  render() {
    return (
      <>
        <div className="message-box">
          <div className="message-card">
            <div className="message-text">
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Message"
                    id="messageText"
                    required onChange={this.handleEditFieldChange}
                    value={this.state.messageText}
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="message-btns">
              <ButtonGroup>
                <Button
                  variant="secondary"
                  onClick={() => this.props.handleEditId("")}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    this.makeEditedMessage()
                  }
                >
                  Save
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MessageEditForm;
