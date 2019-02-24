import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/leboncoin.png";

class Header extends React.Component {
  renderLogIn = () => {
    if (this.props.username !== "") {
      return (
        <>
          <div className="connected">{this.props.username} est connecté</div>
          <div className="disconnect" onClick={this.props.handleDisconnection}>
            Déconnexion
          </div>
        </>
      );
    }
    return (
      <>
        <Link to="/sign_up" className="signup-menu">
          Créer un compte
        </Link>
        <Link to="/log_in" className="login">
          Se connecter
        </Link>
      </>
    );
  };
  render() {
    return (
      <div className="bandeau">
        <header className="container">
          <Link to="/">
            <img src={logo} alt="Leboncoin" />
          </Link>
          <Link to="/publish" className="publish">
            DEPOSER UNE ANNONCE
          </Link>
          <Link to="/offers">OFFRES</Link>
          {this.renderLogIn()}
        </header>
      </div>
    );
  }
}

export default Header;
