import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";


import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import UserForm from "./components/auth/UserForm";
import EditProfile from "./components/home/EditProfile"

// import Login from ".//auth/Login";

class ApplicationViews extends Component {
  isAuthenticated = () => localStorage.getItem("credentials") !== null;
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Login} />

        <Route
          exact
          path="/home"
          render={(props) => {
            if (this.isAuthenticated()) {
              return <Home {...props} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          exact
          path="/register-account"
          render={(props) => {
            return <UserForm {...props} />;
          }}
        />
           <Route
          path="/users/:userId(\d+)/edit"
          render={(props) => {
            return <EditProfile {...props} />;
          }}
        />
      </React.Fragment>
    );
  }
}

export default ApplicationViews;
