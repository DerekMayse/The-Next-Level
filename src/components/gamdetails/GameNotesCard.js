import React, { Component } from "react";
// import GameManager from "../../modules/GameManager";
// import NoteManager from "../../modules/NoteManager";
import { Button, Card } from "react-bootstrap";
import "./GameDetails.css";

class GameNotesCard extends Component {
    state = {

       loadingStatus: false
      };

  render() {
    
    return (
      <React.Fragment>
        <div className="notes">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{this.props.note.timestamp}</Card.Title>

              <Card.Text>
                <p>{this.props.note.text}</p>
              </Card.Text>
                
                  <Button
                    variant="danger"
                    type="button"
                    disabled={this.state.loadingStatus}
                    onClick={() => this.props.handleDelete(this.props.note.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => {
                      this.props.history.push(`/notes/${this.props.note.id}/edit`);
                    }}
                  >
                    Edit
                  </Button>
            </Card.Body>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default GameNotesCard;
