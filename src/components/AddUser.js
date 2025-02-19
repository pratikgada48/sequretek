import React, { useState } from "react";
import { BaseUrl } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const navigate = useNavigate();

  const handleChange = (val) => {
    val.name === "job"
      ? setJob(val.value)
      : val.name === "email"
      ? setEmail(val.value)
      : setName(val.value);
  };

  const handleSubmit = () => {
    let data = { name, email, job };
    if (name != "" && email !== "" && job !== "") {
      axios
        .post(`${BaseUrl}/api/users`, { data })
        .then((res) => {
          navigate(`/`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleBack = () => {
    navigate(`/`);
  };

  return (
    <>
      <div className="container">
        <h3 className="heading">Add User Form</h3>
        <div className="form-container">
          <form name="add-user-form" onSubmit={handleSubmit}>
            <label htmlFor="name" className="form-label">
              Name <span className="required-mark">*</span>
            </label>
            <input
              name="name"
              id="name"
              type="text"
              className="form-input"
              pattern="^[a-zA-Z ]{2,30}$"
              onChange={(e) =>
                handleChange({ name: "name", value: e.target.value })
              }
              required
              autoFocus
              autoComplete="off"
            />
            <label htmlFor="email" className="form-label">
              Email ID <span className="required-mark">*</span>
            </label>
            <input
              name="email"
              id="email"
              type="email"
              className="form-input"
              pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
              onChange={(e) =>
                handleChange({ name: "email", value: e.target.value })
              }
              required
              autoComplete="off"
            />
            <label htmlFor="job" className="form-label">
              Job <span className="required-mark">*</span>
            </label>
            <input
              name="job"
              id="job"
              type="text"
              className="form-input"
              pattern="^[a-zA-Z ]{2,20}$"
              onChange={(e) =>
                handleChange({ name: "job", value: e.target.value })
              }
              required
              autoComplete="off"
            />
          </form>
          <button type="submit" className="submitBtn" onClick={handleSubmit}>
            Submit
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" className="submitBtn" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default AddUser;
