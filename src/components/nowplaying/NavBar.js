import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Navbar, Nav} from "react-bootstrap";

class NavBar extends Component {

    render(){
  
      return (
<Navbar bg="dark" variant="dark">
<Navbar.Brand href="">TheNextLevel</Navbar.Brand>
<Nav className="mr-auto">
  <Nav.Link href="/home">Home</Nav.Link>
  <Nav.Link href="/games/nowplaying">Now Playing</Nav.Link>
  <Nav.Link href="/games/completed">Completed</Nav.Link>
  <Nav.Link href="/games/backlog">Backlog</Nav.Link>
  <Nav.Link href="/games/wishlist">Wishlist</Nav.Link>
</Nav>

</Navbar>

)
}
}

export default NavBar;