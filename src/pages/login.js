import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/userSLice";
import { ShowMessage } from "../component/errorHandler/error";
import RingLoader from "react-spinners/RingLoader";


function Login() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [status, setStatus] = useState();
    const [message, setMessage] = useState();
    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}v1/user/login`, {
            email: userData.email,
            password: userData.password
        }).then((response) => {
            setLoading(false)
            localStorage.setItem('User', JSON.stringify(response.data));
            dispatch((login(response.data)));
            navigate('/');
        }).catch((error) => {
            setMessage(error.response.data.message);
            setStatus(error.response.status);
        });
    };

    return <>
        {
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
                <div className='conatainer'>
                    <form className='main' onSubmit={handleSubmit}>
                        <div className="text-center mb-10">
                            <h1 className="text-dark mb-3">Login</h1>
                            <ShowMessage status={status} message={message} />
                        </div>
                        <div className="mb-3">
                            <label className="bold">
                                Email address :
                            </label>
                            <input
                                onChange={handleChange}
                                type="email"
                                placeholder="Email address "
                                name="email"
                                className="form-control margin_input"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="bold">
                                Password :
                            </label>
                            <input
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="form-control margin_input"
                                id="exampleInputPassword1"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn sub_btn color btn-primary">
                                login
                            </button>
                        </div>
                    </form>
                </div>
        }
    </>
}

export default Login;