import axios from "axios";
import { getUser } from "../component/servises/common";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminPortal() {
  const user = getUser();
  const API_URL = process.env.REACT_APP_API_URL;
  const [adminBook, setAdminBook] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  };

  useEffect(() => {
    getBook();
  }, []);

  const getBook = async () => {
    axios.get(`${API_URL}v1/admin/book`, config)
      .then((response) => {
        setAdminBook(response.data.data);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  return <div className="book_container">
    {
      adminBook.map((book) => {
        return (
          < div key={book.id} className='book_box' >
            <h3>Title : {book.title}</h3>
            <h3>Author : {book.author}</h3>
            <img className="book_image" src={book.image_path} alt="" />
            <div className="link_btn">
              <Link className="btn color" to={'/editBook/' + book.book_code}>
                Edit Book
              </Link>
            </div>
          </div>
        )
      })
    }
  </div>
}

export default AdminPortal;