import axios from "axios";
import React from "react";

export default class UrlParam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      errorMessage: ''
    };
  };

  componentDidMount() {
    this.getBook();
  };

  getBook() {
    const API_URL = process.env.REACT_APP_API_URL;
    axios.get(API_URL + "v1/guest/book-detail/gUy0oQsDRv")
      .then((response) => {
        this.setState({
          book: response.data.data,
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.response.data.message
        });
      });
  };

  render() {


    return (<div>
      {Object.entries(this.state.book).length > 0
        ?
        <div key={this.state.book.id} className='book_box'>
          <h3>Title : {this.state.book.title}</h3>
          <h3>Author : {this.state.book.author}</h3>
          <h3>Book_code : {this.state.book.book_code}</h3>
          <h3>Difficulty : {this.state.book.difficulty}</h3>
          <h3>Description : </h3>
          <h5>{this.state.book.description}</h5>
          <h3>Sample_text : </h3>
          <h5>{this.state.book.sample_text}</h5>
          <img className="book_image" src={this.state.book.image_path} alt="" />
        </div>
        : <div className='book_box'>{this.state.errorMessage}</div>
      }
    </div>);
  }
}