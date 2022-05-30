import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { getUser } from "../component/servises/common";
import { cartTotal } from "../store/totalSlice";
import RingLoader from "react-spinners/RingLoader";


function Home() {
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch();
    const user = getUser();
    const API_URL = process.env.REACT_APP_API_URL;

    const [books, setBook] = useState([]);
    useEffect(() => {
        setLoading(true)
        getbook();
    }, []);

    const getbook = async () => {
        axios.get(`${API_URL}v1/guest/list-book`).then((response) => {
            setBook(response.data.data);
            setLoading(false)
        });
    };

    const handleCart = (book) => {
        dispatch((addToCart(book)));
    };

    return <>{
        loading ?
            <div className='loader'>
                < RingLoader
                    size={100}
                    color={"#F14B4D"}
                    loading={loading}
                />
                <p>Loading...</p>
            </div >
            :
            <div className="book_container">
                {
                    books.map((book) => {
                        return (
                            < div key={book.id} className='book_box' >
                                <h3>Title : {book.title}</h3>
                                <h3>Author : {book.author}</h3>
                                <img className="book_image" src={book.image_path} alt="" />
                                <div className="link_btn">
                                    <Link className="btn color" to={'/bookdetail/' + book.book_code}>
                                        Book Detail
                                    </Link>
                                </div>
                                {/* <div className="link_btn">
                            <Link className="btn color" to={'/bookdetail2/' + book.book_code}>
                                Book Detail 2
                            </Link>
                        </div> */}
                                {
                                    Object.entries(user).length > 0 && <div className="link_btn">
                                        <button className="btn color" onClick={() => {
                                            handleCart(book);
                                            dispatch((cartTotal(100)))
                                        }}>
                                            Add to cart
                                        </button>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div >
    }
    </>
}

export default Home;