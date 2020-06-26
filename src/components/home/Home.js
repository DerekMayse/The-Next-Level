import React, { Component } from "react";
import { Container, Form, Button, Navbar, Nav, Card } from "react-bootstrap";
import ProfileManager from "../../modules/ProfileManager";
import GameManager from '../../modules/GameManager'
import "./Home.css";

class Home extends Component {
  //define what this component needs to render
  state = {
    users: [],
    games:[]
  };
  

  componentDidMount() {
    ProfileManager.get(parseInt(localStorage.getItem("userId"))).then(
      (user) => {
        console.log(user);
        this.setState({
          users: user,
        });
      
      } 

    )
   

   .then(() => GameManager.getAll()
    .then((games) => { 
       //take the games that come back turn them into arrays of completed game and in progress
       const nowPlaying =  games.filter(game => {
        return game
    })
  

    if (this.state.games.statusId === 2){
      return nowPlaying
    }
        
      this.setState({
            games: nowPlaying
        })
        console.log(nowPlaying)
    }))
  
  }
  

  render() {
    // console.log(this.state.users);
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="">TheNextLevel</Navbar.Brand>
          <Nav className="mr-auto">
            <Navbar.Text>
              <h1 className="mainHeading">
                Welcome, <em>{localStorage.getItem("username")}</em>
              </h1>
              <div classname="signedInAs">
              Signed in as: <a href="#login">{this.state.users.name}</a>
              </div>
             
            </Navbar.Text>
          </Nav>
        </Navbar>

        <div className="bttnSection">
          <Button
            variant="outline-dark"
            type="button"
            className="editProfileBttn"
            onClick={() => {
              this.props.history.push(`/users/${this.state.users.id}/edit`);
            }}
          >
            Edit Profile
          </Button>
          <Button
            variant="outline-dark"
            type="button"
            className="allGamesBttn"
            onClick={() => {
              this.props.history.push(`/games/nowplaying`);
            }}
          >
            View All Games
          </Button>
          <Button
            variant="outline-dark"
            type="button"
            className="logOutBttn"
            href="/"
            onClick={() => localStorage.clear()}
          >
            Log Out
          </Button>
        </div>
        <div className="headingDiv">
          <h2 className="aboutMe">About Me</h2>
          <div className="aboutInfo">
            <img
              className="profileImage"
              src={this.state.users.profilepicture}
              alt="profilePic"
            ></img>

            <p>{this.state.users.aboutme} </p>
          </div>

          <h2 className="currentHeading">Currently Playing</h2>
          <div>
     
          </div>
          <h2 className="completedSection">Recently Completed</h2>
        </div>
        <Container className="new-message-form">
          <Form.Group>
            <Form.Control
              size="sm"
              type="text"
              className="messageInput"
              //   onChange={this.handleNewFieldChange}
              //   value={this.state.message}
              placeholder="New Message"
            />
          </Form.Group>
        </Container>
        <div className="messageSend">
          <Button
            type="button"
            variant="outline-dark"
            size="sm"
            onClick={() => this.createNewMessage()}
          >
            Send
          </Button>{" "}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
