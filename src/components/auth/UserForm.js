import React, { Component } from "react";
import UserRegistation from "../../modules/UserRegistration";
import { Form, Button } from "react-bootstrap";

class UserForm extends Component {
  //setting user information as an empty string and loading status to state
  state = {
    name: "",
    birthdate: "",
    username: "",
    email: "",
    password: "",
    aboutme: "",
    profilepicture: "",
    loadingStatus: false,
  };


   // changes the state when the user types in information
  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // makes a new user 
  constructNewUser = (evt) => {
    evt.preventDefault();
    if (
      this.state.name === "" ||
      this.state.birthdate === "" ||
      this.state.username === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.aboutme === "" ||
      this.state.profilepicture === ""
    ) {
      window.alert("Please input information in the fields provided below");
    } else {
      this.setState({ loadingStatus: true });
      const users = {
        name: this.state.name,
        birthdate: this.state.birthdate,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        aboutme: this.state.aboutme,
        profilepicture: this.state.profilepicture,
      };

      console.log(users);

      //posts the new user's information to the api
      UserRegistation.post(users)
        .then()
        .then(
          () =>
            window.alert("Account Created Successfully") ||
            this.props.history.push("/")
        );
    }
  };
  handleUniqueInformation = (e) => {
    e.preventDefault();
    /*
        For now, just store the email and password that
        the customer enters into local storage.
    */
    localStorage.setItem(
      "credentials",
      JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    );
    this.props.history.push("/home");
  };

  render() {
    return (
      <>
        <h1>Account Registration</h1>
        <Form>

          <Form.Group >
          <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              onChange={this.handleFieldChange}
              id="name"
            />
          </Form.Group>

          <Form.Group >
          <Form.Label>Birthdate</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your birthday"
              onChange={this.handleFieldChange}
              id="birthdate"
            />
          </Form.Group>

          <Form.Label>UserName</Form.Label>
          <Form.Group >
            <Form.Control
              type="text"
              placeholder="Pick a username"
              onChange={this.handleFieldChange}
              id="username"
            />
          </Form.Group>

          <Form.Label>Email Address</Form.Label>
          <Form.Group >
            <Form.Control
              type="text"
              placeholder="Enter your email"
              onChange={this.handleFieldChange}
              id="email"
            />
          </Form.Group>

          <Form.Label>Password</Form.Label>
          <Form.Group >
            <Form.Control
              type="password"
              placeholder="Choose a password"
              onChange={this.handleFieldChange}
              id="password"
            />
          </Form.Group>

          <Form.Group >
            <Form.Label>About Me</Form.Label>
            <Form.Control
              as="textarea"
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
              placeholder="Image Address"
              onChange={this.handleFieldChange}
              id="profilepicture"
            />
          </Form.Group>

          <Button
            variant="outline-dark"
            type="button"
            disabled={this.state.loadingStatus}
            onClick={this.constructNewUser}>
            Submit
          </Button>

        </Form>
      </>
    );
  }
}

export default UserForm;
