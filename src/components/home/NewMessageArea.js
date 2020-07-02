import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Form, Container } from "react-bootstrap";
import "./Messages.css";

class NewMessageArea extends Component {
  state = {
    message: "", 
  };

  handleNewFieldChange = (evt) => {
    this.setState({
      message: evt.target.value,
    });
  };

  createNewMessage = (evt) => {
    const newlyCreatedMessage = {
      message: this.state.message,
      time: this.props.curTime,
    };

    this.props.handleNew(newlyCreatedMessage);
  };

  render() {
    return (
      <>
        <Container className="new-message-form">
          <Form.Group
          >
            <Form.Control
              size="lg"
              type="text"
              onChange={this.handleNewFieldChange}
              value={this.state.message}
              placeholder="New Message"
              
            />
          </Form.Group>
        </Container>
        <div>
          <Button
            type="button"
            variant="danger"
            size="lg"
            onClick={() => this.createNewMessage()}
          >
            Send
          </Button>{" "}
        </div>
      </>
    );
  }
}

// onClick={this.props.addNewMessage(this.state.message)}
export default NewMessageArea;
