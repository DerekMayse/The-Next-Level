import React, { Component } from "react";
import NoteManager from "../../modules/NoteManager";
import { Form, Button } from 'react-bootstrap'
import NavBar from "../nowplaying/NavBar"

// change route to note/new/gameId
//get all consoles  map through op
class NewNoteForm extends Component {
  state = {
    
    text: "",
    
  
    loadingStatus: false,
  };

  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewNote = (evt) => {
    evt.preventDefault();
    if (
      
      this.state.text === "" 
    
    ) {
      window.alert("Please input information in the feilds provided below");
    } else {
      this.setState({ loadingStatus: true });
      const note = {
        timestamp: `${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        text: this.state.text,
        gameId: parseInt(this.props.match.params.gameId)
     
      };

      NoteManager.post(note).then(() => this.props.history.push(`/games/${this.props.match.params.gameId}`));
    }
  }

  render() {
    return (


<>
<NavBar />
<h1>Add Note</h1>
<Form>
  <Form.Group controlId="formBasicEmail">
    
    
    <Form.Control type="text"  onChange={this.handleFieldChange}
                value={this.state.text}
                id="text"/>
  </Form.Group>

  


  <Button   type="button"
  variant="danger"
                disabled={this.state.loadingStatus}
                onClick={this.constructNewNote}>
    Save
  </Button>
  </Form>
  </>



      
    );
  }
}

export default NewNoteForm;
