import React, { Component } from "react";
import GameManager from "../../modules/GameManager";
// import "./BookForm.css";
import { Form, Button } from 'react-bootstrap'

class NewGameForm extends Component {
  state = {
    title: "",
    boxart: "",
    year: "",
    publisher: "",
    console: "",
    owned: null,
    userId:"",
    status:"",
    loadingStatus: false,
  };

  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewBook = (evt) => {
    evt.preventDefault();
    if (
      this.state.title === "" ||
      this.state.boxart === "" ||
      this.state.year === "" ||
      this.state.publisher === "" ||
      this.state.console === ""||
      this.state.owned === ""||
      this.state.status === ""
    ) {
      window.alert("Please input information in the feilds provided below");
    } else {
      this.setState({ loadingStatus: true });
      const game = {
        title: this.state.title,
        boxart: this.state.boxart,
        year: this.state.year,
        publisher: this.state.publisher,
        console: this.state.console,
        owned: this.state.owned,
        status: this.state.status,
      };

      GameManager.post(game).then(() => this.props.history.push("/games/nowplaying"));
    }
  };

  render() {
    return (
      <>
      <h1>Add A New Game </h1>
        <Form>
  <Form.Group controlId="formBasicEmail">
    
    
    <Form.Control type="text"  placeholder="Game Title" onChange={this.handleFieldChange}
               
                id="title"/>
  </Form.Group>
  <Form.Group>
 
    <Form.Control    onChange={this.handleFieldChange}
                placeholder="Box Art"
                id="boxart"/>
  </Form.Group>
  <Form.Group>
  
    <Form.Control onChange={this.handleFieldChange}
                placeholder="Year"
                id="Year"/>
  </Form.Group>

  <Form.Group>
  
  <Form.Control onChange={this.handleFieldChange}
              placeholder="Published By"
              id="publisher"/>
</Form.Group>

<Form.Control as="select">
    <option>Console</option>
  </Form.Control>

  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Owned?" />
  </Form.Group>

  <Form.Control as="select">
    <option>Status</option>
  </Form.Control>

 

  <Button variant="primary" type="submit"disabled={this.state.loadingStatus}
                onClick={this.constructNewArticle} >
    Save
  </Button>
  </Form>
      </>
    );
  }
}

export default NewGameForm;
