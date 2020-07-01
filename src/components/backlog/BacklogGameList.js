import React, { Component } from 'react'
import GameManager from '../../modules/GameManager'
import BacklogGames from "./BacklogGames"
import NavBar from "../nowplaying/NavBar"
import './BacklogGamesList.css'
import { Button } from "react-bootstrap";


class BacklogGameList extends Component {
    //define what this component needs to render
    state = {
      games  : [],
    }

 

componentDidMount(){
   
    
    GameManager.getAll()
    .then((games) => {console.log(games)
        this.setState({
            games: games
        })
    })
}



render(){
  
console.log( this.state.games)

  return(
    <React.Fragment>
     <NavBar />
    
     <Button variant="danger" onClick={() => {
            this.props.history.push(`/games/new`);
          }} >Add Game</Button>
     <h1 className="backlog">Backlog</h1>

     <div className="cardContainer">
     {this.state.games.map(game =>
        <BacklogGames key={game.id} game={game} {...this.props} />
      )}
     
      
     
   </div>

   </React.Fragment>
  )
}
}



export default BacklogGameList;