import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import SignUp from "./containers/SignUp";
import LogIn from "./containers/LogIn";
import Publish from "./containers/Publish";

class App extends Component {
  state = {
    userId: "",
    token: Cookies.get("token") || "",
    username: Cookies.get("username") || ""
  };
  setUser = userAccount => {
    Cookies.set("token", userAccount.token);
    Cookies.set("username", userAccount.account.username);
    this.setState({ userId: userAccount._id, token: userAccount.token, username: userAccount.account.username });
  };
  getUser = () => {
    return this.state;
  };

  handleDisconnection = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    this.setState({ userId: "", token: "", username: "" });
  };
  render() {
    return (
      <Router>
        <>
          <Header username={this.state.username} handleDisconnection={this.handleDisconnection} />
          <Switch>
            <Route
              exact={true}
              path="/"
              render={props => (this.state.username !== "" ? <Redirect to="/offres" /> : <LogIn setUser={this.setUser} {...props} />)}
            />
            <Route path="/offres" render={props => (this.state.username === "" ? <Redirect to="/log_in" /> : <Home {...props} />)} />
            <Route path="/offer/:id" render={props => <Offer {...props} />} />
            <Route path="/sign_up" render={props => <SignUp setUser={this.setUser} {...props} />} />
            <Route
              path="/log_in"
              render={props => (this.state.username !== "" ? <Redirect to="/offres" /> : <LogIn setUser={this.setUser} {...props} />)}
            />
            <Route
              path="/publish"
              render={props => (this.state.username === "" ? <Redirect to="/log_in" /> : <Publish getUser={this.getUser} {...props} />)}
            />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
