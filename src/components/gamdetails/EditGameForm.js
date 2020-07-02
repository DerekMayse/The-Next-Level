import React, { Component } from "react";
import GameManager from "../../modules/GameManager";
import { Form, Button } from "react-bootstrap";
import NavBar from "../nowplaying/NavBar";
import ConsoleManager from "../../modules/ConsoleManager";
import StatusManager from "../../modules/StatusManager";

class EditGameForm extends Component {
  state = {
    title: "",
    boxart: "",
    year: "",
    publisher: "",
    consoles: [],
    owned: "",
    userId: "",
    statuses: [],
    loadingStatus: true,
  };

  handleClick = () => {
    this.setState({
      owned: !this.state.owned,
    });
  };

  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingGame = (evt) => {
    evt.preventDefault();
    this.setState({ loadingStatus: true });
    const editedGame = {
      id: this.props.match.params.gameId,
      title: this.state.title,
      boxart: this.state.boxart,
      year: this.state.year,
      publisher: this.state.publisher,
      consoleId: this.state.consoleId,
      owned: this.state.owned,
      userId: this.state.userId,
      statusId: this.state.statusId,
    };

    GameManager.update(editedGame).then(() =>
      this.props.history.push(`/games/${this.state.gameId}`)
    );
  };

  componentDidMount() {
    GameManager.get(this.props.match.params.gameId).then((game) => {
      this.setState({
        title: game.title,
        boxart: game.boxart,
        year: game.year,
        publisher: game.publisher,
        consoleId: parseInt(this.state.consoleId),
        owned: game.owned,
        statusId: parseInt(this.state.statusId),
        userId: parseInt(localStorage.getItem("userId")),
        loadingStatus: false,
      });
    });

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

  render() {
    return (
      <>
        <NavBar />
        <h1>Edit Game</h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              onChange={this.handleFieldChange}
              value={this.state.title}
              id="title"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={this.handleFieldChange}
              value={this.state.boxart}
              id="boxart"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={this.handleFieldChange}
              value={this.state.year}
              id="Year"
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              onChange={this.handleFieldChange}
              value={this.state.publisher}
              id="publisher"
            />
          </Form.Group>

          <Form.Control
            as="select"
            onChange={this.handleFieldChange}
            value={this.state.consoleId}
            id="consoleId"
          >
            {this.state.consoles.map((systems) => (
              <option value={systems.id}>{systems.name}</option>
            ))}
          </Form.Control>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              value={this.state.owned}
              label="Owned?"
              onClick={this.handleClick}
            />
          </Form.Group>

          <Form.Control as="select" value={parseInt(this.state.statusId)}>
            {this.state.statuses.map((status) => (
              <option value={status.id}>{status.info}</option>
            ))}
          </Form.Control>

          <Button
            variant="danger"
            type="submit"
            disabled={this.state.loadingStatus}
            onClick={this.updateExistingGame}
          >
            Save
          </Button>
        </Form>
      </>
    );
  }
}

export default EditGameForm;
