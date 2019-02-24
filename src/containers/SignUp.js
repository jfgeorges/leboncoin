import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
    signUpError: false,
    statusError: 0,
    errorMessage: ""
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(this.props.dbUrl + "/user/sign_up", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      });
      this.setState({ signUpError: false, statusError: 0, errorMessage: "" });
      this.props.setUser(response.data);
    } catch (error) {
      this.setState({ signUpError: true, statusError: error.response.status, errorMessage: error.response.data.error });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  renderSignUpError = () => {
    if (this.state.signUpError) {
      switch (this.state.statusError) {
        case 422: //  Saisie incorrecte
          return <h4>{this.state.errorMessage}</h4>;
        case 500: // Erreur de sauvegarde Mongoose
          return <h4>Problème: compte non sauvegardé</h4>;
        default:
          return <h4>Erreur lors de la création du compte</h4>;
      }
    }
    return null;
  };
  render() {
    return (
      <section className="container main signup">
        <h2>Créez un compte</h2>
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" placeholder="username" value={this.state.username} onChange={this.handleChange} />
          <label htmlFor="username">Email</label>
          <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
          <label htmlFor="username">Password</label>
          <input type="text" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
          <input type="submit" value="Valider" />
        </form>
        {this.renderSignUpError()}
      </section>
    );
  }
}

export default SignUp;
