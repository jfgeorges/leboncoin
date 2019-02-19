import React from "react";
import axios from "axios";

class Offer extends React.Component {
  state = {
    offer: {} // On reçoit un objet, on l'initialise par défaut
  };
  componentDidMount = async () => {
    const response = await axios.get("https://leboncoin-api.herokuapp.com/api/offer/" + this.props.match.params.id);
    this.setState({ offer: response.data });
  };
  render() {
    return (
      <div className="offer card-container">
        <div className="card-offer-page">
          <div className="image-offer-placeholder" />
          <h3>{this.state.offer.title}</h3>
          <div className="card-price">{this.state.offer.price} €</div>
        </div>
        <h3>Description</h3>
        <p>{this.state.offer.description}</p>
      </div>
    );
  }
}

export default Offer;
