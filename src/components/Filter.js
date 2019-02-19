import React from "react";

class Filter extends React.Component {
  state = {
    search: ""
  };
  handleChange = event => {
    this.setState({ search: event.target.value });
  };
  render() {
    return (
      <div className="bandeau-filter">
        <div className="main container filter">
          <input type="text" placeholder="Que recherchez-vous ?" onChange={this.handleChange} />
          <button onClick={() => this.props.handleFilter(this.state.search)}>Rechercher</button>
        </div>
      </div>
    );
  }
}

export default Filter;
