import React, { useState, useEffect } from "react";
import axios from "axios";
export default () => {
    const api = process.env.React_App_api;

    let [book, setbook] = useState([]);

    useEffect(() => {
        getbook();
    }, []);

    const getbook = async () => {
        axios.get(api).then((response) => {
            setbook(response.data)
            console.log(book);
        });
    };

    return <>
    <h1>abc</h1>
    </>
}