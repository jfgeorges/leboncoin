import React from "react";
import axios from "axios";
import userPicture from "../assets/img/user2.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class Offer extends React.Component {
  state = {
    offer: {} // On reçoit un objet, on l'initialise par défaut
  };
  componentDidMount = async () => {
    const response = await axios.get(this.props.dbUrl + "/offer/" + this.props.match.params.id);
    this.setState({ offer: response.data });
  };
  renderImage = () => {
    if (this.state.offer.pictures && this.state.offer.pictures.length > 0) {
      return this.state.offer.pictures.map((img, i) => <img key={"img-" + i} src={img.secure_url} alt="offer" className="image-offer-placeholder" />);
    }
    return <img src={userPicture} alt="user" className="image-offer-placeholder" />;
  };
  renderCreator = () => {
    if (this.state.offer.creator) {
      return (
        <div className="offer-creator">
          <img src={userPicture} alt="Seller" />
          <h4>{this.state.offer.creator.account.username}</h4>
          {/* <div>{this.state.offer.created}</div> */}
        </div>
      );
    }
    return null;
  };
  render() {
    return (
      <div className="container offer-container">
        <div className="offer">
          <div className="card-offer-page">
            <Carousel>{this.renderImage()}</Carousel>
            <h3>{this.state.offer.title}</h3>
            <div className="card-price">{this.state.offer.price} €</div>
          </div>
          <h3>Description</h3>
          <p>{this.state.offer.description}</p>
        </div>
        {this.renderCreator()}
      </div>
    );
  }
}

export default Offer;
