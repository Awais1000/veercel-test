import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
function Bookdetail() {

    const dispatch = useDispatch();
    const { book_code } = useParams();
    const API_URL = process.env.REACT_APP_API_URL;
    const [book, setBook] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getBook();
    }, []);
    const getBook = async () => {
        axios.get(`${API_URL}v1/guest/book-detail/${book_code}`)
            .then((response) => {
                setBook(response.data.data);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };
    const handleCart = () => {
        dispatch((addToCart(book)));

    }

    return <div className="bookdetail_container">
        {Object.entries(book).length > 0
            ?
            <div key={book.id} className='book_box2'>
                <h3>Title : {book.title}</h3>
                <h3>Author : {book.author}</h3>
                <h3>Book_code : {book.book_code}</h3>
                <h3>Difficulty : {book.difficulty}</h3>
                <h3>Hours : {book.hours}</h3>
                <h3>Minutes : {book.minutes}</h3>
                <h3>Description : </h3>
                <h5>{book.description}</h5>
                <h3>Sample_text : </h3>
                <h5>{book.sample_text}</h5>
                <img className="book_image" src={book.image_path} alt="" />
                <div className="link_btn">
                    <button className="btn color" onClick={() => {
                        handleCart(book);
                    }}>
                        Add to cart
                    </button>
                </div>

            </div>
            : <div className='book_box2'>{errorMessage}</div>
        }
    </div>
}

export default Bookdetail;