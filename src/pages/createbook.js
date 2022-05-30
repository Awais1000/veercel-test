import { useState } from "react";
import axios from "axios";
import { getUser } from "../component/servises/common";
import { ShowMessage } from "../component/errorHandler/error";

function CreateBook() {
  const [status, setStatus] = useState();
  const optionArray = ["Easy", "Medium", "Hard"]
  const [message, setMessage] = useState();
  const [errorMessageForInput, setErrorMessageForInput] = useState({});
  const user = getUser();
  const [state, setState] = useState({
    id: "",
    title: "",
    description: "",
    book_author: "",
    narrated_by: "",
    hour: "",
    minute: "",
    difficulty_level: "",
    book_image: "",
    book_audio: "",
    sample_text: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleFileChange = (event) => {
    const value = event.target.files[0];
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append("title", state.title);
    formData.append("author", state.book_author);
    formData.append("narrated_by", state.narrated_by);
    formData.append("hours", state.hour);
    formData.append("minutes", state.minute);
    formData.append("description", state.description);
    formData.append("difficulty", state.difficulty_level);
    formData.append("book_image", state.book_image);
    formData.append("sample_audio", state.book_audio);
    formData.append("sample_text", state.sample_text);

    for (var key of formData.entries()) {
      formData[key[0]] = key[1];
      console.log(formData);
    }

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}v1/admin/book`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      data: formData
    })
      .then((response) => {
        setStatus(response.status);
        setMessage(response.data.message);
        setErrorMessageForInput({});

      }).catch((error) => {
        setMessage(error.response.data.message);
        setStatus(error.response.status);
        setErrorMessageForInput(error.response.data.errors);

      });
  };
  return (
    <>
      <div className="conatainer">
        <form
          id="formid"
          className="main"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="headings">
            <h1 className="heading2"> Add Book </h1>
            <ShowMessage status={status} message={message} />
          </div>
          <div className="mb-3">
            <label className="bold">
              Book Title :
            </label>
            <input
              className="form-control margin_input"
              type="text"
              name="title"
              id="title"
              placeholder="Book Title"
              onChange={handleChange}
              autoComplete=""
            // required
            />
            {Object.entries(errorMessageForInput).length > 0 &&
              <div className="errormessage">{errorMessageForInput.title}</div>
            }
          </div>
          <div className="mb-3">
            <label className="bold">
              Book Description:
            </label>
            <textarea
              className="form-control margin_input"
              type="text"
              name="description"
              id="description"
              placeholder="Book Description"
              onChange={handleChange}
              rows="4"
              cols="50"
              autoComplete="true"
            // required
            />
            {Object.entries(errorMessageForInput).length > 0 &&
              <div className="errormessage">{errorMessageForInput.description}</div>
            }
          </div>
          <div className="mb-3">
            <label className="bold">
              Book Author :
            </label>
            <input
              className="form-control margin_input"
              type="text"
              name="book_author"
              id="book_author"
              placeholder="Book Author"
              onChange={handleChange}
              required
              autoComplete=""
            />
            {Object.entries(errorMessageForInput).length > 0 &&
              <div className="errormessage">{errorMessageForInput.book_author}</div>
            }
          </div>
          <div className="mb-3">
            <label className="bold">
              Narrated By :
            </label>
            <input
              className="form-control margin_input"
              type="text"
              name="narrated_by"
              id="narrated_by"
              placeholder="Narrated By"
              onChange={handleChange}
              required
            />
            {Object.entries(errorMessageForInput).length > 0 &&
              <div className="errormessage">{errorMessageForInput.narrated_by}</div>
            }
          </div>
          <div className="mb-3">
            <label className="bold">
              Book Sample Text :
            </label>
            <input
              className="form-control margin_input"
              type="text"
              name="sample_text"
              id="sample_text"
              placeholder="Book Sample Text"
              onChange={handleChange}
              required
            />
            {Object.entries(errorMessageForInput).length > 0 &&
              <div className="errormessage">{errorMessageForInput.sample_text}</div>
            }
          </div>
          <div className="mb-3">
            <label className="bold">
              Hours :
            </label>
            <input
              className="form-control margin_input"
              type="integer" 
              name="hour"
              id="hour"
              placeholder="Hours"
              onChange={handleChange}
              required
            />
            {Object.entries(errorMessageForInput).length > 0 &&
              <div className="errormessage">{errorMessageForInput.hours}</div>
            }
          </div>
          <div className="mb-3">
            <label className="bold">
              Minutes :
            </label>
            <input
              className="form-control margin_input"
              type="integer"
              name="minute"
              id="minute"
              placeholder="Minutes"
              onChange={handleChange}
              required
            />
            {Object.entries(errorMessageForInput).length > 0 &&
              <div className="errormessage">{errorMessageForInput.minutes}</div>
            }
          </div>
          <div className="mb-3">
            <label className="bold">
              Difficulty :
            </label>
            <select
              name="difficulty_level"
              id="difficulty_level"
              onChange={handleChange}
              className=" form-select margin_input"
              defaultValue={""}
            >
              <option value="" disabled hidden>Select Difficulty level</option>
              {
                optionArray.map((options, index) => {
                  return <option value={options} key={index} >{options}</option>
                })
              }
            </select>
            {Object.entries(errorMessageForInput).length > 0 &&
              <div className="errormessage">{errorMessageForInput.difficulty}</div>
            }
          </div>
          <div className="mb-3">
            <label className="bold">
              Upload Book Cover Image :
            </label>
            <input
              className="form-control margin_input"
              type="file"
              name="book_image"
              id="book_image"
              placeholder="Upload Image"
              onChange={handleFileChange}
              required
            />
            {Object.entries(errorMessageForInput).length > 0 &&
              <div className="errormessage">{errorMessageForInput.image_path}</div>
            }
          </div>
          <div className="mb-3">
            <label className="bold">
              Upload Book Audio :
            </label>
            <input
              className="form-control margin_input"
              type="file"
              name="book_audio"
              id="book_audio"
              onChange={handleFileChange}
              required
            />
            {Object.entries(errorMessageForInput).length > 0 &&
              <div className="errormessage">{errorMessageForInput.sample_audio}</div>
            }
          </div>
          <div className="text-center">
            <button type="submit" className="btn sub_btn color btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateBook;