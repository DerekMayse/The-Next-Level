import React, { Component } from "react";
import GameManager from "../../modules/GameManager";
import WishListCard from "./WishListCard";
import NavBar from "../nowplaying/NavBar";
import "./WishListList.css";
import { Button } from "react-bootstrap";

class WishListList extends Component {
  //define what this component needs to render
  state = {
    games: [],
  };

  componentDidMount() {
    GameManager.getAll().then((games) => {
      console.log(games);
      this.setState({
        games: games,
      });
    });
  }

  render() {
    console.log(this.state.games);

    return (
      <React.Fragment>
        <NavBar />

        <Button
          variant="danger"
          onClick={() => {
            this.props.history.push(`/games/new`);
          }}
        >
          Add Game
        </Button>
        <h1 className="wishList">Wish List</h1>

        <div className="cardContainer">
          {this.state.games.map((game) => (
            <WishListCard key={game.id} game={game} {...this.props} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default WishListList;
