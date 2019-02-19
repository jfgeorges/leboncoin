import React from "react";
import { Link } from "react-router-dom";

class OfferList extends React.Component {
  render() {
    const linkUrl = "/offer/" + this.props.offer._id;
    return (
      <li>
        <Link to={linkUrl} className="list-item">
          <div className="image-placeholder" />
          <h3>{this.props.offer.title}</h3>
          <div className="card-price">{this.props.offer.price} €</div>
          <p>{this.props.offer.description}</p>
        </Link>
      </li>
    );
  }
}

export default OfferList;
