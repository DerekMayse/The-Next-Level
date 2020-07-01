import React, { Component } from "react";
import GameManager from "../../modules/GameManager";
import NoteManager from "../../modules/NoteManager";
import { Button, Card } from "react-bootstrap";
import "./GameDetails.css";
import GameNotesCard from "./GameNotesCard";

class GameNotes extends Component {
  state = {
    games: [],
    notes: [],
  };

  componentDidMount() {
    GameManager.getNotes(this.props.gameId).then((game) => {
      this.setState({
        notes: game.notes,

        loadingStatus: false,
      });
    });
  }

  handleDelete = (id) => {
    this.setState({ loadingStatus: true });
    NoteManager.delete(id).then(() =>
      NoteManager.getAll().then((notes) => {
        this.setState({
          notes: notes,
        });
      })
    );
  };

  //need method to get all notes again
  // pass them down as props to gamenotescard
  //call that in handle delete

  render() {
    return (
      <React.Fragment>
        <Button
          variant="danger"
          onClick={() => {
            this.props.history.push(`/notes/new/${this.props.gameId}`);
          }}
        >
          Add Note
        </Button>
        <h1 className="nowPlaying">Notes</h1>

        <div className="cardContainer">
          {this.state.notes.map((note) => (
            <GameNotesCard
              key={note.id}
              note={note}
              handleDelete={this.handleDelete}
              {...this.props}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default GameNotes;
