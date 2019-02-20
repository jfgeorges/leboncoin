import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
    signUpError: false
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      });
      this.props.setUser(response.data);
    } catch (error) {
      this.setState({ signUpError: true });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  renderSignUpError = () => {
    if (this.state.signUpError) {
      return <h4>Ce compte existe déjà</h4>;
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
