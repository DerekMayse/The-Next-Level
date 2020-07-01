import React, { Component } from 'react'
import GameManager from '../../modules/GameManager'
import CompletedGames from "./CompletedGames"
import NavBar from "../nowplaying/NavBar"
import './CompletedGamesList.css'
import { Button } from "react-bootstrap";



class CompletedGameList extends Component {
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
     <Button variant="danger"onClick={() => {
            this.props.history.push(`/games/new`);
          }} >Add Game</Button>
     <h1 className="completedHeading">Completed</h1>

     <div className="cardContainer">
     {this.state.games.map(game =>
        <CompletedGames key={game.id} game={game} {...this.props} />
      )}
     
      
     
   </div>

   </React.Fragment>
  )
}
}



export default CompletedGameList;