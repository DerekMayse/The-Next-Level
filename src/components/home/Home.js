import React, { Component } from "react";
import { Container, Form, Button, Navbar, Nav, Card } from "react-bootstrap";
import ProfileManager from "../../modules/ProfileManager";
import GameManager from "../../modules/GameManager";
import "./Home.css";
import NowPlayingGameCard from "../nowplaying/NowPlayingGameCard";
import CompletedGames from "../completed/CompletedGames";
class Home extends Component {
  //define what this component needs to render
  state = {
    users: [],
    nowPlaying: [],
    completedGames: [],
  };

  componentDidMount() {
    ProfileManager.get(parseInt(localStorage.getItem("userId")))
      .then((user) => {
        console.log(user);
        this.setState({
          users: user,
        });
      })

      .then(() =>
        GameManager.getAll().then((game) => {
          //take the games that come back turn them into arrays of completed game and in progress

          const nowPlaying = game.filter((games) => {
            let nowPlayingStatus = false;

            if (games.statusId === 2) {
              nowPlayingStatus = true;
            }

            return nowPlayingStatus;
          });

          const completed = game.filter((games) => {
            let completedStatus = false;

            if (games.statusId === 3) {
              completedStatus = true;
            }

            return completedStatus;
          });

          this.setState({
            nowPlaying: nowPlaying.slice(0, 3),
            completedGames: completed.slice(0, 3),
          });
        })
      );
  }

  render() {
    console.log(this.state.nowPlaying, this.state.completedGames);

    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="">TheNextLevel</Navbar.Brand>
          <Nav className="mr-auto">
            <Navbar.Text>
              <h1 className="mainHeading">
                Welcome, <em>{localStorage.getItem("username")}</em>
              </h1>
              <div >
                Signed in as: <a href="#login"classname="signedInAs" >{this.state.users.name}</a>
              </div>
            </Navbar.Text>
          </Nav>
        </Navbar>

        <div className="bttnSection">
          <Button
            variant="danger"
            type="button"
            className="editProfileBttn"
            onClick={() => {
              this.props.history.push(`/users/${this.state.users.id}/edit`);
            }}
          >
            Edit Profile
          </Button>
          <Button
            variant="danger"
            type="button"
            className="allGamesBttn"
            onClick={() => {
              this.props.history.push(`/games/nowplaying`);
            }}
          >
            View All Games
          </Button>
          <Button
            variant="danger"
            type="button"
            className="logOutBttn"
            href="/"
            onClick={() => localStorage.clear()}
          >
            Log Out
          </Button>
          <div className="parentContainer">
          <div className="headingDiv">
            <div className="aboutCurrent">
           
              <Card style={{ width: "18rem" }}>
                <Card.Title> <h2 >About Me</h2>
              </Card.Title>
                <Card.Img variant="top" src={this.state.users.profilepicture} />
                <Card.Body>
                  <Card.Text>
                    <p>{this.state.users.aboutme}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              </div>
            

            <div className="nowPlaying">
              <Card>
            <Card.Title><h2 className="currentTitle">Currently Playing</h2></Card.Title>
            </Card>
            <div className="nowPLayingCard">
              {this.state.nowPlaying.map((game) => (
                <NowPlayingGameCard key={game.id} game={game} />
              ))}
            </div>
            </div>
           

            <div className="completed">
            <h2 className="recentlyCompleted">Recently Completed</h2>
              <div className="completedCard">
          {this.state.completedGames.map((game) => (
            <CompletedGames key={game.id} game={game} />
          ))}
          </div>
                   </div>
                   </div>
          <Container className="container" style={{ width: "18rem" }}>
            <Form.Group className="new-message-form">
              <Form.Control
                size="sm"
                style={{ width: "18rem" }}  
                type="text"
                className="messageInput"
                variant="light"
                //   onChange={this.handleNewFieldChange}
                //   value={this.state.message}
                placeholder="New Message"
              />
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => this.createNewMessage()}
              >
                Send
              </Button>{" "}
            </Form.Group>
          </Container>
          <div className="messageSend"></div>
          </div>
          </div>
      </React.Fragment>
    );
  }
}

export default Home;
