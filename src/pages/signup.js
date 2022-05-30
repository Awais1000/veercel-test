import { useState } from "react";
import { ShowMessage } from "../component/errorHandler/error";
import { InputError } from "../component/errorHandler/errorResponse";
import axios from "axios";

function Signup() {
    const [status, setStatus] = useState();
    const [message, setMessage] = useState();
    const [inputErrors, setInputErrors] = useState({});
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        repeat_password: ""
    });

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}v1/user/signup`, {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            repeat_password: userData.repeat_password
        }).then((response) => {
            setInputErrors({});
            setStatus(response.status);
            setMessage(response.data.message);

        }).catch((error) => {
            setMessage(error.response.data.message);
            setStatus(error.response.status);
            setInputErrors(error.response.data.errors);
            
        });
    
    };
    console.log(inputErrors.name);

    return <div className='conatainer'>
        <form className='main' method="POST" onSubmit={handleSubmit}>
            <div className="text-center mb-10">
                <h1 className="text-dark mb-3">Signup</h1>
                <ShowMessage status={status} message={message} />
            </div>
            <div className="mb-3">
                <label className="bold">
                    Name :
                </label>
                <input
                    onChange={handleChange}
                    name="name"
                    placeholder="Name"
                    type="text"
                    className="form-control margin_input"
                    id="name"
                    aria-describedby="emailHelp"
                />
                {/* {Object.entries(errorMessageForInput).length > 0 &&
                    <div className="errormessage">{errorMessageForInput.name}</div>
                } */}
                <InputError name={inputErrors.name} />
            </div>
            <div className="mb-3">
                <label className="bold">
                    Email address :
                </label>
                <input
                    onChange={handleChange}
                    placeholder="Email address"
                    name="email"
                    type="email"
                    className="form-control margin_input"
                    id="email"
                    aria-describedby="emailHelp"
                />
                {/* {Object.entries(errorMessageForInput).length > 0 &&
                    <div className="errormessage">{errorMessageForInput.email}</div>
                } */}
                <InputError email={inputErrors.email} />
            </div>
            <div className="mb-3">
                <label className="bold">
                    Password :
                </label>
                <input
                    onChange={handleChange}
                    placeholder="Password"
                    name="password"
                    type="password"
                    className="form-control margin_input"
                    id="password"
                    aria-describedby="emailHelp"
                />
                {/* {Object.entries(errorMessageForInput).length > 0 &&
                    <div className="errormessage">{errorMessageForInput.password}</div>
                } */}
                <InputError password={inputErrors.password} />
            </div>
            <div className="mb-3">
                <label className="bold">
                    Repeat Password :
                </label>
                <input
                    onChange={handleChange}
                    placeholder="Repeat Password"
                    name="repeat_password"
                    type="password"
                    className="form-control margin_input"
                    id="repeat_Password"
                    aria-describedby="emailHelp"
                />
                {/* {Object.entries(errorMessageForInput).length > 0 &&
                    <div className="errormessage">{errorMessageForInput.password}</div>
                } */}
                <InputError password={inputErrors.password} />
            </div>
            <div className="text-center">
                <button type="submit" className="btn sub_btn color btn-primary">
                    Signup
                </button>
            </div>
        </form>
    </div>
}

export default Signup;