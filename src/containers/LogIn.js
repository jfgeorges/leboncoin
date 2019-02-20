import React from "react";
import axios from "axios";

class LogIn extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
    logInError: false
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post("https://leboncoin-api.herokuapp.com/api/user/log_in", {
        email: this.state.email,
        password: this.state.password
      });
      this.props.setUser(response.data);
    } catch (error) {
      this.setState({ logInError: true });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  renderLogInError = () => {
    if (this.state.logInError) {
      return <h4>Identifiants erronés</h4>;
    }
    return null;
  };

  render() {
    return (
      <section className="container main signup">
        <h2>Connexion</h2>
        <form className="signin-form" onSubmit={this.handleSubmit}>
          <label htmlFor="email">Adresse Email</label>
          <input id="email" name="email" type="text" value={this.state.email} onChange={this.handleChange} />
          <label htmlFor="password">Mot de passe</label>
          <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <input type="submit" value="Se connecter" />
        </form>
        {this.renderLogInError()}
      </section>
    );
  }
}

export default LogIn;
