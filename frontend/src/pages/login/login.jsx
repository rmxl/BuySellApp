import "./login.css";
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MessageDiv from "../components/message/messageDiv";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [postData, setPostData] = useState({
    email: "",
    password: "",
  });

  const recaptchaRef = useRef();

  // MESSAGE POPUP LOGIC START

  const [showMessageDiv, setShowMessageDiv] = useState(false);
  const [message, setMessage] = useState("");

  const showServerMessage = (message) => {
    setMessage(message);
    setShowMessageDiv(true);
    setTimeout(() => {
      setShowMessageDiv(false);
    }, 5000);
  };

  // MESSAGE POPUP LOGIC END

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = recaptchaRef.current.getValue();

    //DISABLED FOR NOW TO MAKE LIFE EASIER

    if (!token) {
      showServerMessage("Please complete the captcha");
      return;
    }

    if (!postData.email || !postData.password) {
      showServerMessage("Fields should not be empty");
      return;
    }
    if (postData.email.endsWith(".iiit.ac.in") === false) {
      showServerMessage("Please enter a valid IIIT email address");
      return;
    }

    axios
      .post("http://localhost:5000/login", postData)
      .then((res) => {
        localStorage.setItem("auth-token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        showServerMessage(err.response.data.message);
      });
  };

  const casLogin = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:5000/cas/login")
      .then((res) => {
        window.location.href = res.data.loginUrl;
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
    <div className="container_login">
      <div className="site_name_login">Buy, Sell @ IIITH</div>
      {showMessageDiv && <MessageDiv message={message} />}
      <div className="container2_login">
        <form className="login-form_login" onSubmit={handleSubmit}>
          <div className="input_field_login">
            <label className="svg-img_login" htmlFor="email">
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
              value={postData.email}
              onChange={handleChange}
              className="input_text_login"
              placeholder="Email"
              type="email"
            />
          </div>
          <div className="input_field_login">
            <label className="svg-img_login" htmlFor="password">
              <svg x="0px" y="0px" width="15px" height="5px">
                <g>
                  <path
                    fill="#B1B7C4"
                    d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"
                  />
                </g>
              </svg>
            </label>
            <input
              id="password"
              value={postData.password}
              onChange={handleChange}
              className="input_text_login"
              placeholder="Password"
              type="password"
            />
          </div>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LdBdLwqAAAAALqV7vmTNuHPcCq6IUUT1Tu3Qtrl"
            className="captcha"
          />
          <input className="submit_login" type="submit" value="LOGIN" />
          <input
            className="submit_login"
            type="submit"
            value="LOGIN VIA CAS"
            onClick={casLogin}
          />
        </form>
        <div className="register_login">
          Don't have an account?{" "}
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
