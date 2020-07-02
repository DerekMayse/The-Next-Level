import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";

class MessageCard extends Component {
  render() {
    return (
      <>
        <div className="message-box">
          <div className="message-card">
            <div className="message-text">
              {this.props.message.message}
              <p>{this.props.message.time}</p>
            </div>
            <div className="message-btns">
              <ButtonGroup>
                <Button
                  variant="danger"
                  onClick={() => this.props.handleEditId(this.props.message.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    this.props.deleteMessage(this.props.message.id)
                  }
                >
                  Delete
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MessageCard;
