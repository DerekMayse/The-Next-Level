import React, { Component } from "react"
import Button from 'react-bootstrap/Button'
import { Form, Container } from 'react-bootstrap'
import LoginManager from '../../modules/LoginManager'
import {Link } from "react-router-dom"
import "./Login.css"

class Login extends Component {

 
  state = {
    email: "",
    password: ""
  }


  
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }


  handleLogin = (e) => {
    
    e.preventDefault()

   LoginManager.loginAccount(this.state.email).then(user => {
    console.log(user)
    if(user.length === 0){
        window.alert(`I'm sorry! The email you entered is not in our system. Please try again!`)
    } else{
        if (this.state.password === user[0].password){
            localStorage.setItem("userId", user[0].id);
            localStorage.setItem("username", user[0].username);
            localStorage.setItem(
            "credentials",
            JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        )
        this.props.history.push("/home");

        }
        else{
            window.alert(`I'm sorry! The password you entered does not exist with the email: ${this.state.email}  Please try again!`)
        }
    }
    
    })

  }



  render() {

    return (
      <>
      <br />
        <Container className="login-form center">
          <div className="login-heading">
          <h2 >WELCO</h2>
          <h2>METOT</h2>
          <h2>HENEX</h2>
          <h2>TLEVEL</h2>
          </div>
          <Link className="registerLink" to={`/register-account`}>Register An Account?</Link>
            <Form onSubmit={this.handleLogin}>
              <Form.Group>
                
                <p className="or">or</p>
                <Form.Label className="loginLabel">Login</Form.Label>
                <Form.Control type="email" id="email" onChange={this.handleFieldChange} placeholder="Enter email" required="" />
              </Form.Group>
              <Form.Group>
              
                <Form.Control type="password" id="password" onChange={this.handleFieldChange} placeholder="Password" required=""/>
              </Form.Group>
              <div className="button-row">
                <Button variant="danger" type="submit">Submit </Button>
              </div>
           
             
            </Form>
         
          </Container>
         
      </>
      
    )
  }

}

export default Login
