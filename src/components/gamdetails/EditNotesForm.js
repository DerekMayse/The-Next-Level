import React, { Component } from "react"
import NoteManager from "../../modules/NoteManager"
import { Form, Button } from 'react-bootstrap'
import NavBar from "../nowplaying/NavBar"
import "./GameDetails.css";

class EditNotesForm extends Component {
    
    state = {
      timestamp: "",
      text: "",
      gameId: "",
     
      
      loadingStatus: true,
    };

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    update = evt => {

      evt.preventDefault()
      this.setState({ loadingStatus: true });
      const editedNote = {
        id: this.props.match.params.noteId,
        
        
        timestamp: this.state.timestamp,
        text: this.state.text,
        gameId: this.state.gameId
      };

      NoteManager.update(editedNote)
      .then(() => this.props.history.push(`/games/${this.state.gameId}`))
    }

    componentDidMount() {
      
      NoteManager.get(this.props.match.params.noteId)
      .then(note => {
          this.setState({
            timestamp: note.timestamp,
            text: note.text,
            gameId: note.gameId,
          
            loadingStatus: false,
          });
      });
    }

    render() {
            return (
<>
<div className="editNoteSection">
<NavBar />
<h1 className="editNoteHead">Edit Note</h1>
<Form>
  <Form.Group controlId="formBasicEmail">
    
    
    <Form.Control type="text" rows="5"  as="textarea"  onChange={this.handleFieldChange}
                value={this.state.text}
                id="text"/>
  </Form.Group>

  


  <Button variant="danger" type="submit"disabled={this.state.loadingStatus}
                onClick={this.update} >
    Save
  </Button>
  </Form>
  </div>
  </>

        
      );
    }
}

export default EditNotesForm