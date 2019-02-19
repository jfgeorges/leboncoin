import React from "react";
import axios from "axios";
import Filter from "../components/Filter";
import OfferList from "../components/OfferList";
import Pagination from "../components/Pagination";

class Home extends React.Component {
  state = { nbOffer: 0, offers: [], totalPages: 0, pageNum: 1, limit: 25 };
  componentDidMount = async () => {
    const response = await axios.get("https://leboncoin-api.herokuapp.com/api/offer/with-count");
    this.setState({ nbOffer: response.data.count, offers: response.data.offers, totalPages: Math.ceil(response.data.count / this.state.limit) });
  };

  renderOffers = () => {
    return this.state.offers.map((offer, i) => {
      return <OfferList key={i} offer={offer} />;
    });
  };
  handlePages = async pageNumber => {
    const url = "https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=" + (pageNumber - 1) * 25 + "&limit=25";
    const response = await axios.get(url);
    this.setState({ nbOffer: response.data.count, offers: response.data.offers, pageNum: pageNumber });
  };
  handleFilter = async title => {
    if (title.length > 0) {
      const url = "https://leboncoin-api.herokuapp.com/api/offer/with-count?title=" + title;
      const response = await axios.get(url);
      this.setState({ nbOffer: response.data.count, offers: response.data.offers, pageNum: 1 });
    }
  };
  render() {
    return (
      <>
        <Filter handleFilter={this.handleFilter} />
        <section className="container main">
          <div className="nb-offer">{this.state.nbOffer} annonces</div>
          <ul className="card-container">{this.renderOffers()}</ul>
          <div className="card-container pagination">
            <span className="other-page">&#60;</span>
            <Pagination handlePages={this.handlePages} totalPages={this.state.totalPages} currentPage={this.state.pageNum} />
            <span className="other-page">&#62;</span>
          </div>
        </section>
      </>
    );
  }
}

export default Home;
