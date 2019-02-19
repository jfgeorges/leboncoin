import React from "react";

class Pagination extends React.Component {
  renderPagination = () => {
    const pagination = [];
    let className = "";
    for (let i = 1; i <= this.props.totalPages; i++) {
      className = "other-page";
      if (i === this.props.currentPage) {
        className = "current-page";
      }
      pagination.push(
        <span key={"page-" + i} className={className} onClick={() => this.props.handlePages(i)}>
          {i}
        </span>
      );
    }
    return pagination;
  };
  render() {
    return <>{this.renderPagination()}</>;
  }
}

export default Pagination;
