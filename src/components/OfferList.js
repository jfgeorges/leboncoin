import React from "react";
import { Link } from "react-router-dom";

class OfferList extends React.Component {
  renderImage = () => {
    if (this.props.offer.pictures && this.props.offer.pictures.length > 0) {
      return <img src={this.props.offer.pictures[0].secure_url} alt="offer" className="image-placeholder" />;
    }
    return <div className="image-placeholder" />;
  };
  render() {
    const linkUrl = "/offer/" + this.props.offer._id;
    return (
      <li>
        <Link to={linkUrl} className="list-item">
          {this.renderImage()}
          <h3>{this.props.offer.title}</h3>
          <div className="card-price">{this.props.offer.price} €</div>
          <p>{this.props.offer.description}</p>
        </Link>
      </li>
    );
  }
}

export default OfferList;
