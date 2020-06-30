import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import UserForm from "./components/auth/UserForm";
import EditProfile from "./components/home/EditProfile";
import NowPlayingGameList from "./components/nowplaying/NowPlayingGameList";
import CompletedGamesList from "./components/completed/CompletedGamesList";
import BacklogGamesList from "./components/backlog/BacklogGameList";
import WishListList from "./components/wishlist/WishListList";
import GameDetails from "./components/gamdetails/GameDetails"

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
        <Route
          exact
          path="/games/nowplaying"
          render={(props) => {
            if (this.isAuthenticated()) {
              return <NowPlayingGameList {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/games/completed"
          render={(props) => {
            if (this.isAuthenticated()) {
              return <CompletedGamesList {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/games/backlog"
          render={(props) => {
            if (this.isAuthenticated()) {
              return <BacklogGamesList {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
          <Route
          exact
          path="/games/wishlist"
          render={(props) => {
            if (this.isAuthenticated()) {
              return <WishListList {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
             <Route
          exact
          path="/games/:gameId(\d+)"
          render={(props) => {
            // Pass the animalId to the AnimalDetailComponent
            return (
              <GameDetails
                gameId={parseInt(props.match.params.gameId)}
                {...props}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default ApplicationViews;
