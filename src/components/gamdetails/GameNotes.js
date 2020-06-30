import React, { Component } from "react";
import NoteManager from "../../modules/NoteManager";
import { Button, Card } from "react-bootstrap";
import "./GameDetails.css";

class GameNotes extends Component {
  state = {
    notes: [],
  };


  componentDidMount(){
   
    
    NoteManager.getAll(this.state.notes.gameId)
    .then((notes) => {console.log(notes)
        this.setState({
            notes: notes
        })
    })
}

  handleDelete = () => {
    //invoke the delete function in AnimalManger and re-direct to the animal list.
    this.setState({ loadingStatus: true });
    NoteManager.delete(this.props.noteId).then(() =>
      this.props.history.push("/games/")
    );
  };

  render() {
    console.log(this.state.notes.timestamp);
    return (
      <React.Fragment>


          <Button variant="danger">New Note</Button>
        <div className="notes">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{this.state.notes.timestamp}</Card.Title>
              <Card.Text>
                <p>{this.state.notes.text}</p>
              </Card.Text>
              
              <Button
                variant="danger"
                type="button"
                disabled={this.state.loadingStatus}
                onClick={this.handleDelete}
              >
                Delete
              </Button>
              <Button
                variant="danger"
                type="button"
                onClick={() => {
                  this.props.history.push(`/games/${this.props.gameId}/edit`);
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

export default GameNotes;
