import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import ProfileManager from "../../modules/ProfileManager";
import './Home.css'

class Home extends Component {
  //define what this component needs to render
  state = {
    users: [],
  };

  componentDidMount() {
    console.log("users: componentDidMount");

    ProfileManager.get(parseInt(localStorage.getItem("userId"))).then((user => {
      console.log(user)
      this.setState({
        users: user
      });
    }))
  }

  render() {
    // console.log(this.state.users);
    return (
      <React.Fragment>
        <h1 className="mainHeading">Welcome, <em>{localStorage.getItem("username")}</em></h1>
       <div className="bttnSection">

       
        <Button
          variant="outline-dark"
          type="button"
          className="editProfileBttn"
          onClick={() => {this.props.history.push(`/users/${this.state.users.id}/edit`)}}
        >
          Edit Profile
        </Button>
        <Button variant="outline-dark" type="button" className="allGamesBttn">
          View All Games
        </Button>
        <Button variant="outline-dark" type="button" className="logOutBttn" href="/" onClick={()=> localStorage.clear()}>
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
