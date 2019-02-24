import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";

class Publish extends React.Component {
  state = {
    title: "",
    description: "",
    price: 0,
    pictures: [],
    publishError: false,
    created: ""
  };
  handleSubmit = async event => {
    event.preventDefault();
    const user = this.props.getUser();
    try {
      const response = await axios.post(
        this.props.dbUrl + "/offer/publish",
        {
          title: this.state.title,
          description: this.state.description,
          pictures: this.state.pictures,
          price: Number(this.state.price)
        },
        {
          headers: {
            authorization: "Bearer " + user.token
          }
        }
      );
      this.setState({ publishError: false, created: response.data.created });
    } catch (error) {
      this.setState({ publishError: true });
    }
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleFiles = pictures => {
    const newPictures = [...this.state.pictures, ...pictures.base64];
    this.setState({
      pictures: newPictures
    });
  };
  renderPublication = () => {
    if (this.state.publishError) {
      return <div>Problème de publication, annonce non publiée.</div>;
    } else {
      return <div>Annonce {this.state.title} publiée.</div>;
    }
  };
  render() {
    const picturesArray = [];
    for (let i = 0; i < this.state.pictures.length; i++) {
      picturesArray.push(
        <img
          key={i}
          onClick={() => {
            // En cliquant sur l'image, le fichier sera supprimé
            const newPictures = [...this.state.pictures];
            newPictures.splice(i, 1);
            this.setState({ pictures: newPictures });
          }}
          src={this.state.pictures[i]}
          alt="Annonce"
        />
      );
    }
    return (
      <div className="container">
        <div className="advert-container">
          <h2 className="advert-title">Votre annonce</h2>
          <div className="advert-section-container">
            <section>
              <form className="advert-form" onSubmit={this.handleSubmit}>
                <label htmlFor="titre">Titre de l'annonce</label>
                <input id="title" name="title" type="text" value={this.state.title} onChange={this.handleChange} />
                <label htmlFor="description">Texte de l'annonce</label>
                <textarea id="description" name="description" value={this.state.description} onChange={this.handleChange} />
                <label htmlFor="titre">Prix</label>
                <input id="price" name="price" type="text" value={this.state.price} onChange={this.handleChange} />
                <input className="advert-valid" type="submit" value="Valider" />
              </form>
              {this.renderPublication()}
            </section>
            <section className="advert-pictures">
              <ReactFileReader
                fileTypes={[".png", ".jpg"]}
                base64={true}
                multipleFiles={true} // `false si une seule image`
                handleFiles={this.handleFiles}
              >
                <button>Choisir des images</button>
              </ReactFileReader>

              {picturesArray}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Publish;
