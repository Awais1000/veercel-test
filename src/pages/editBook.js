import axios from "axios";
import { getUser } from "../component/servises/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShowMessage } from "../component/errorHandler/error";

function EditBook() {
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();
  const optionArray = ["Easy", "Medium", "Hard"]
  const [errorMessageForInput, setErrorMessageForInput] = useState({});
  const { book_code } = useParams();
  const user = getUser();
  const [state, setState] = useState({
    title: "",
    description: "",
    book_author: "",
    narrated_by: "",
    hour: "",
    minute: "",
    difficulty_level: "",
    sample_text: "",
  });

  useEffect(() => {
    getBook();
  }, []);

  const getBook = async () => {
    axios.get(`${process.env.REACT_APP_API_URL}v1/guest/book-detail/${book_code}`)
      .then((response) => {
        setState({
          title: response.data.data.title,
          description: response.data.data.description,
          book_author: response.data.data.author,
          narrated_by: response.data.data.narrated_by,
          hour: response.data.data.hours,
          minute: response.data.data.minutes,
          difficulty_level: response.data.data.difficulty,
          sample_text: response.data.data.sample_text
        });
      })
      .catch((error) => {
        console.log(error.reponse.data.message);
      });
  };;

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData()
    formData.append("title", state.title);
    formData.append("author", state.book_author);
    formData.append("narrated_by", state.narrated_by);
    formData.append("hours", state.hour);
    formData.append("minutes", state.minute);
    formData.append("description", state.description);
    formData.append("difficulty", state.difficulty_level);
    formData.append("sample_text", state.sample_text);

    // for (var key of formData.entries()) {
    //   formData[key[0]] = key[1];
    //   console.log("formdata",formData);
    // }

    // axios.put(`${process.env.REACT_APP_API_URL}v1/admin/book/${book_code}`, formData , config)
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}v1/admin/book/${book_code}`,
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`
      },
      data: {
        title: state.title,
        description: state.description,
        author: state.book_author,
        narrated_by: state.narrated_by,
        hours: state.hour,
        minutes: state.minute,
        difficulty: state.difficulty_level,
        sample_text: state.sample_text

      }
    })
      .then((response) => {
        setErrorMessageForInput({});
        setMessage(response.data.message);
        setStatus(response.status);
      })
      .catch((error) => {
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
          <div className="text-center mb-10">
            <h1 className="text-dark mb-3"> Update Book </h1>
            <ShowMessage status={status} message={message} />
          </div>
          <div className="fv-row mb-10">
            <label className="bold">
              Book Title :
            </label>
            <input
              className="form-control margin_input"
              type="text"
              value={state.title}
              name="title"
              id="title"
              placeholder="Book Title"
              onChange={handleChange}
              autoComplete=""
              required
            />
            {Object.entries(errorMessageForInput).length > 0 &&
              <div className="errormessage">{errorMessageForInput.title}</div>
            }
          </div>

          <div className="fv-row mb-10">
            <label className="bold">
              Book Description :
            </label>
            <textarea
              className="form-control margin_input"
              type="text"
              value={state.description}
              name="description"
              id="description"
              placeholder="Book Description"
              onChange={handleChange}
              required
              rows="4"
              cols="50"
              autoComplete="true"
            />
            {Object.entries(errorMessageForInput).length > 0 &&
              <div className="errormessage">{errorMessageForInput.description}</div>
            }
          </div>

          <div className="fv-row mb-10">
            <label className="bold">
              Book Author :
            </label>
            <input
              className="form-control margin_input"
              type="text"
              value={state.book_author}
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

          <div className="fv-row mb-10">
            <label className="bold">
              Narrated By :
            </label>
            <input
              className="form-control margin_input"
              type="text"
              value={state.narrated_by}
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

          <div className="fv-row mb-10">
            <label className="bold">
              Book Sample Text :
            </label>
            <input
              className="form-control margin_input"
              value={state.sample_text}
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
              value={state.hour}
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
              value={state.minute}
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
              value={state.difficulty_level}
            >
              <option value="" disabled hidden>Select Difficulty level</option>
              {
                optionArray.map((options, index) => {
                  return <option value={options} key={index}> {options}</option>
                })
              }
            </select>
            {Object.entries(errorMessageForInput).length > 0 &&
              <div className="errormessage">{errorMessageForInput.difficulty}</div>
            }
          </div>

          <div className="text-center">
            <button type="submit" className="btn sub_btn color btn-primary">
              Update Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditBook;