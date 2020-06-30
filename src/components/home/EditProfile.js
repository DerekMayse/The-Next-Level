import React, { Component } from "react";
import ProfileManager from "../../modules/ProfileManager"
import { Form, Button } from "react-bootstrap";

class EditProfile extends Component {
  //setting user information as an empty string and loading status to state
  state = {
    name:"",
    birthdate: "",
    username: "",
    email:"",
    password:"",
    aboutme: "",
    profilepicture: "",
    loadingStatus: true,
  };


   // changes the state when the user types in information
  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // changes existing user information 
  updateExistingUser = evt => {
    evt.preventDefault()
    this.setState({ loadingStatus: true });
    const editedUser = {
      id: this.props.match.params.userId,
      name:this.state.name,
      birthdate:this.state.birthdate,
      username:this.state.username,
      email:this.state.email,
      password:this.state.password,
      aboutme: this.state.aboutme,
      profilepicture: this.state.profilepicture
    };
      ;

     
      ProfileManager.update(editedUser)
      .then(() => this.props.history.push("/home"))
    }
    componentDidMount() {
        ProfileManager.get(this.props.match.params.userId)
        .then(user => {
            this.setState({
              name: user.name,
              birthdate: user.birthdate,
              username: user.username,
              email: user.email,
              password: user.password,
              aboutme: user.aboutme,
              profilepicture: user.profilepicture,
              loadingStatus: false,
            });
        });
    }

  render() {
    return (
      <>
        <h1>EditProfile</h1>
        <Form>
          
        <Form.Group >
            <Form.Label>Name</Form.Label>
            <Form.Control
              as="textarea"
              value={this.state.name}
              maxlength = "100"
              type="text"
              placeholder="Name"
              onChange={this.handleFieldChange}
              id="aboutme"
            />
          </Form.Group>
          <Form.Group >
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              as="textarea"
              value={this.state.birthdate}
              maxlength = "100"
              type="text"
              placeholder="Name"
              onChange={this.handleFieldChange}
              id="aboutme"
            />
          </Form.Group>
          <Form.Group >
            <Form.Label>UserName</Form.Label>
            <Form.Control
              as="textarea"
              value={this.state.username}
              maxlength = "100"
              type="text"
              placeholder="Name"
              onChange={this.handleFieldChange}
              id="aboutme"
            />
          </Form.Group>
          <Form.Group >
            <Form.Label>Email</Form.Label>
            <Form.Control
              as="textarea"
              value={this.state.email}
              maxlength = "100"
              type="text"
              placeholder="Name"
              onChange={this.handleFieldChange}
              id="aboutme"
            />
          </Form.Group>
          <Form.Group >
            <Form.Label>Password</Form.Label>
            <Form.Control
              as="textarea"
              value={this.state.password}
              maxlength = "100"
              type="password"
              placeholder="Name"
              onChange={this.handleFieldChange}
              id="aboutme"
            />
          </Form.Group>

          <Form.Group >
            <Form.Label>About Me</Form.Label>
            <Form.Control
              as="textarea"
              value={this.state.aboutme}
              maxlength = "100"
              rows="3"
              type="textarea"
              placeholder="Put some information about yourself here"
              onChange={this.handleFieldChange}
              id="aboutme"
            />
          </Form.Group>

          <Form.Group >
          <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="text"
              value={this.state.profilepicture}
              
              onChange={this.handleFieldChange}
              id="profilepicture"
            />
          </Form.Group>

          <Button
            variant="outline-dark"
            type="button"
            disabled={this.state.loadingStatus}
            onClick={this.updateExistingUser}>
            Save
          </Button>

        </Form>
      </>
  
  );
  };
}

  



export default EditProfile;
