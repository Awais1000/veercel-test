
import React, { useState } from "react"
import axios from "axios";
import { getUser } from "./component/servises/common";

export default function CreateBook() {

  const [errorMessage, setErrorMessage] = useState('')
  const API_URL = process.env.REACT_APP_API_URL;
  const user = getUser()

  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  };

  const [state, setState] = useState({
    title: "",
    author: '',
    description: '',
    difficulty: '',
    sampleText: '',
    sampleAudio: '',
    narratedBy: '',
    hours: '',
    minutes: '',
    bookImage: ""
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const fileChnageHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.files[0]
    });
    // console.log(event.target.files[0]);
    // setFile(event.target.files[0])
    // console.log(state.bookImage);
  }

  const setBook = (event) => {
    event.preventDefault();

    var formData = new FormData();

    formData.append("title", state.title);
    formData.append("author", state.author);
    formData.append("sample_text", state.sampleText)
    formData.append("sample_audio", state.sampleAudio)
    formData.append("narrated_by", state.narratedBy)
    formData.append("hours", state.hours)
    formData.append("minutes", state.minutes)
    formData.append("description", state.description)
    formData.append("difficulty", state.difficulty)
    // formdata.append('book_image', statedata.bookImage)

    // console.log('file :', file);
    // const formdata = new FormData();

    // formdata.append('image_path ', file)



    // for(var key of formdata.entries())
    // {
    //   formdata[key[0]] = key[1]
    //   console.log(formdata);
    // }

    // axios.post(`${API_URL}v1/admin/book`, formdata, config)
    axios({
      method: "post",
      url: `${API_URL}v1/admin/book`,
      headers: {

        Accept: 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      data: formData
      // data: {
      // title: state.title,
      // author: state.author,
      // book_code: state.bookCode,
      // sample_text: state.sampleText,
      // sample_audio: state.sampleAudio,
      // narrated_by: state.narratedBy,
      // hours: state.hours,
      // minutes: state.minutes,
      // description: state.description,
      // difficulty: state.difficulty,
      //   formData
      // },
    })
      .then((response) => {
        console.log(response.data.data);
      }).catch((error) => {
        setErrorMessage(error.response.data.message)
        console.log(error.response.data);
      })
  }
  return <div className='conatainer'>
    <form className='main' onSubmit={setBook} method='POST'>
      <h1 className='heading2'>Create Book</h1>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Title :
        </label>
        <input
          name="title"
          onChange={handleChange}
          type="text"
          className="form-control"
          id="title"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Author :
        </label>
        <input
          name="author"
          onChange={handleChange}
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          aria-describedby="emailHelp"
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Difficulty :
        </label>
        <input
          name="difficulty"
          onChange={handleChange}
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          aria-describedby="emailHelp"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Description :
        </label>
        <input
          name='description'
          onChange={handleChange}
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          aria-describedby="emailHelp"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Hour :
        </label>
        <input
          name="hours"
          onChange={handleChange}
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          aria-describedby="emailHelp"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Minutes :
        </label>
        <input
          name='minutes'
          onChange={handleChange}
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          aria-describedby="emailHelp"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Narrated by :
        </label>
        <input
          name="narratedBy"
          onChange={handleChange}
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          aria-describedby="emailHelp"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Sample_audio :
        </label>
        <input
          name="sampleAudio"
          onChange={handleChange}
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          aria-describedby="emailHelp"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Sample_text :
        </label>
        <input
          name="sampleText"
          onChange={handleChange}
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          aria-describedby="emailHelp"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Image :
        </label>
        <input
          name='bookImage'
          onChange={fileChnageHandler}
          type="file"
          className="form-control"
          id="exampleInputPassword1"
          aria-describedby="emailHelp"
          required
        />
      </div>
      <button type="submit"  className="btn color btn-primary">
        Create Book
      </button>
    </form>
  </div>
}


