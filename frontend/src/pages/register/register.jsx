import "./register.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageDiv from "../components/message/messageDiv";

function Register() {
  const [postData, setPostData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    contact: "",
    password: "",
  });

  const navigate = useNavigate();

  // MESSAGE POPUP LOGIC START

  const [showMessageDiv, setShowMessageDiv] = useState(false);
  const [message, setMessage] = useState("");

  const showServerMessage = (message) => {
    setMessage(message);
    console.log(message);
    setShowMessageDiv(true);
    setTimeout(() => {
      setShowMessageDiv(false);
    }, 5000);
  };

  // MESSAGE POPUP LOGIC END

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !postData.firstname ||
      !postData.lastname ||
      !postData.email ||
      !postData.age ||
      !postData.contact ||
      !postData.password
    ) {
      showServerMessage("Fields should not be empty");
      // console log which fields are empty
      console.log(postData);
      return;
    }

    if (postData.email.endsWith(".iiit.ac.in") === false) {
      showServerMessage("Please enter a valid IIIT email address");
      return;
    }
    axios
      .post("http://localhost:5000/register", postData)
      .then((res) => {
        console.log(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        showServerMessage(err.response.data.message);
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPostData({
      ...postData,
      [id]: value,
    });
  };

  return (
    <div className="container_register">
      <div className="site_name_register">Buy, Sell @ IIITH</div>
      {showMessageDiv && <MessageDiv message={message} />}
      <form className="register-form_register" onSubmit={handleSubmit}>
        <div className="input_field_register">
          <label className="svg-img_register" htmlFor="fname">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              height="15px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="7" r="4"></circle>
              <path d="M5.5 20a7.5 7.5 0 0 1 13 0"></path>
            </svg>
          </label>
          <input
            id="firstname"
            onChange={handleChange}
            className="input_text_register"
            placeholder="First Name"
            type="text"
          />
        </div>
        <div className="input_field_register">
          <label className="svg-img_register" htmlFor="lname">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              height="15px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="7" r="4"></circle>
              <path d="M5.5 20a7.5 7.5 0 0 1 13 0"></path>
            </svg>
          </label>
          <input
            id="lastname"
            onChange={handleChange}
            className="input_text_register"
            placeholder="Last Name"
            type="text"
          />
        </div>
        <div className="input_field_register">
          <label className="svg-img_register" htmlFor="email">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1zpx"
              height="15px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </label>
          <input
            id="email"
            onChange={handleChange}
            className="input_text_register"
            placeholder="Email"
            type="email"
          />
        </div>
        <div className="input_field_register">
          <label className="svg-img_register" htmlFor="age">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              height="15px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </label>
          <input
            id="age"
            onChange={handleChange}
            className="input_text_register"
            placeholder="Age"
            type="number"
          />
        </div>
        <div className="input_field_register">
          <label className="svg-img_register" htmlFor="number">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              height="15px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.88 19.88 0 0 1-8.63-3.12 19.5 19.5 0 0 1-6-6A19.88 19.88 0 0 1 2.08 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .61 2.58 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.5-1.5a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.58.61A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </label>
          <input
            id="contact"
            onChange={handleChange}
            className="input_text_register"
            placeholder="Contact Number"
            type="number"
          />
        </div>
        <div className="input_field_register">
          <label className="svg-img_register" htmlFor="password">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              height="15px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </label>
          <input
            id="password"
            onChange={handleChange}
            className="input_text_register"
            placeholder="Password"
            type="password"
          />
        </div>

        <input className="submit_register" type="submit" value="REGISTER" />
      </form>
    </div>
  );
}

export default Register;
