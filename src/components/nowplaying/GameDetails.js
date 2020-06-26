import React, { Component } from "react";
import BookManager from "../../modules/BookManager";
// import './AnimalDetail.css'

class BookDetails extends Component {
  state = {
    title: "",
    boxart: "",
    year: "",
    publisher: "",
    consolse: {},
    consoleId: "",
    status:{},
    statusId: "",
    loadingStatus: true,
  };

  componentDidMount() {
    BookManager.get(this.props.bookId).then((book) => {
      this.setState({
        title: book.title,
        cover: book.cover,
        author: book.author,
        genre: book.genre,
        ISBN: book.ISBN,
        loadingStatus: false,
      });
    });
    console.log(this.props.bookId);
  }

    handleDelete = () => {
      //invoke the delete function in AnimalManger and re-direct to the animal list.
      this.setState({ loadingStatus: true });
      BookManager.delete(this.props.bookId).then(() =>
        this.props.history.push("/books")
      );
    };

  render() {
    return (
      <React.Fragment>
        <h3>
          <b>{this.state.title}</b>
        </h3>
        <img
          className="bookImage"
          src={this.state.cover}
          alt="book cover"
        ></img>
        <h4>Author:{this.state.author}</h4>
        <h4>Genre:{this.state.genre}</h4>
        <h4>ISBN:{this.state.ISBN}</h4>
        <button
          type="button"
          disabled={this.state.loadingStatus}
          onClick={this.handleDelete}
        >
          Delete
        </button>
      </React.Fragment>
    );
  }
}

export default BookDetails;
