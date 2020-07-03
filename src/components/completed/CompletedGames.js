import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardDeck, CardColumns,  } from "react-bootstrap";
// import GameManager from "../../modules/GameManager"


class CompletedGames extends Component {






  render() {
    //   console.log(this.props.game.title)
    return (
        
      <React.Fragment>
         {this.props.game.statusId === 3 ? (<Card style={{ width: "18rem" }} classname="gameCard" >
          <Card.Title>{this.props.game.title}</Card.Title>
          <Card.Img variant="top" src={this.props.game.boxart} />
          <Card.Body>
            <Link to={`/games/${this.props.game.id}`}>
              <Button variant="danger">Details</Button>
            </Link>
          </Card.Body>
        </Card>) : ""}
        
      </React.Fragment>
    );
  }
}

export default CompletedGames;
