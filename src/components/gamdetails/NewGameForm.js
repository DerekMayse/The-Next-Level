import React, { Component } from "react";
import GameManager from "../../modules/GameManager";
// import "./BookForm.css";
import { Form, Button } from "react-bootstrap";
import NavBar from "../nowplaying/NavBar";
import ConsoleManager from "../../modules/ConsoleManager";
import StatusManager from "../../modules/StatusManager";
import "./GameDetails.css";
class NewGameForm extends Component {
  state = {
    title: "",
    boxart: "",
    year: "",
    publisher: "",
    consoles: [],
    owned: false,
   
    statuses: [],
    loadingStatus: false,
  };

  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

    handleClick= () => {
      this.setState({
          owned: !this.state.owned
      });
  }

  componentDidMount() {
    ConsoleManager.getAll()
      .then((consoles) => {
        this.setState({
          consoles: consoles,
        });
        console.log(consoles);
      })
      .then(() =>
        StatusManager.getAll().then((statuses) => {
          this.setState({
            statuses: statuses,
          });
          console.log(statuses);
        })
      );
  }

  constructNewGame = (evt) => {
    evt.preventDefault();
    if (
      this.state.title === "" ||
      this.state.boxart === "" ||
      this.state.year === "" ||
      this.state.publisher === "" ||
      this.state.consoles === "" ||
      this.state.owned === "" ||
      this.state.status === ""
    ) {
      window.alert("Please input information in the fields provided below");
    } else {
      this.setState({ loadingStatus: true });
      const game = {
        title: this.state.title,
        boxart: this.state.boxart,
        year: this.state.year,
        publisher: this.state.publisher,
        consoleId: parseInt( this.state.consoleId),
        owned: this.state.owned,
        statusId: parseInt( this.state.statusId),
        userId: parseInt (localStorage.getItem("userId"))
      };

      GameManager.post(game).then(() =>
        this.props.history.push("/games/nowplaying")
      );
    }
  };

  render() {
    return (
      <>
        <div className="game">
        <NavBar />
    
        <h1 className="gameHead">Add A New Game </h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Game Title"
              onChange={this.handleFieldChange}
              id="title"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={this.handleFieldChange}
              placeholder="Box Art"
              id="boxart"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={this.handleFieldChange}
              placeholder="Year"
              id="year"
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              onChange={this.handleFieldChange}
              placeholder="Published By"
              id="publisher"
            />
          </Form.Group>
          <Form.Control as="select" onChange={this.handleFieldChange} id="consoleId">
            {this.state.consoles.map((systems) => (
              <option value={systems.id}>{systems.name}</option>
            ))}
          </Form.Control>

          <br></br>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              onClick={this.handleClick}
              label="Owned?"
            />
          </Form.Group>
          <Form.Control as="select" onChange={this.handleFieldChange} id="statusId">
            {this.state.statuses.map((status) => (
              <option value={status.id}>{status.info}</option>
            ))}
          </Form.Control>

          <br></br>

       

          <Button
            variant="danger"
            type="submit"
            disabled={this.state.loadingStatus}
            onClick={this.constructNewGame}
          >
            Save
          </Button>
        </Form>
        </div>
      </>
    );
  }
}

export default NewGameForm;
