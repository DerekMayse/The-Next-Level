import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card,  } from "react-bootstrap";
// import GameManager from "../../modules/GameManager"


class NowPlayingGames extends Component {






  render() {
      console.log(this.props.game)
    return (
      
      <React.Fragment>
         {this.props.game.statusId === 2 ? (<Card  className="gameCard" style={{ width: "18rem" }}  >
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

export default NowPlayingGames;
