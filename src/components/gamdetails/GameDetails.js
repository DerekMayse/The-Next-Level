import React, { Component } from "react";
import GameManager from "../../modules/GameManager";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import NavBar from "../nowplaying/NavBar"
import './GameDetails.css'
import GameNotes from "../gamdetails/GameNotes"


class GameDetails extends Component {
  state = {
    title: "",
    boxart: "",
    year: "",
    publisher: "",
    consoleId: null,
    owned: null,
    userId: null,
    statusId: null,
    loadingStatus: true,
  };

  componentDidMount() {

    GameManager.get(this.props.gameId).then((game) => {
      this.setState({
        title: game.title,
        boxart: game.boxart,
        year: game.year,
        publisher: game.publisher,
        consoleId: game.consoleId,
        owned: game.owned,
        userId: game.userId,
        statusId: game.statusId,
        loadingStatus: false,
      });
    });
   
  }

  handleDelete = () => {
    //invoke the delete function in AnimalManger and re-direct to the animal list.
    this.setState({ loadingStatus: true });
    GameManager.delete(this.props.gameId).then(() =>
      this.props.history.push("/games/nowplaying")
    );
  };

  render() {
      
    return (
      <React.Fragment>
           <NavBar />
          <div className="gameDetails">

          
        <Card style={{ width: "18rem" }}>
        <Card.Title>{this.state.title}</Card.Title>
          <Card.Img variant="top" src={this.state.boxart} />
          <Card.Body>
            {/* <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text> */}
          </Card.Body>
          <ListGroup className="list-group-flush">
        <ListGroupItem><h6>Realeased:</h6>{this.state.year}</ListGroupItem>
            <ListGroupItem><h6>Published By:</h6>{this.state.publisher} </ListGroupItem>
        <ListGroupItem><h6>Console:{this.state.consoleId}</h6></ListGroupItem>
        <ListGroupItem><h6>Owned:{this.state.owned}</h6></ListGroupItem>
        
          </ListGroup>
          <Card.Body>
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
       <div className="gameNotes">

       
        <GameNotes />
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GameDetails;
