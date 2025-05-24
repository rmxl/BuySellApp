import "./dashboard.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import MessageDiv from "../components/message/messageDiv";
import AddItems from "../components/additems/addItems";

function Dashboard() {
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    contact: "",
    password: "",
  });

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/profile", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setProfileData({
          firstname: res.data.user.firstname,
          lastname: res.data.user.lastname,
          email: res.data.user.email,
          age: res.data.user.age,
          contact: res.data.user.contact,
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const onChange = (e) => {
    const { id, value } = e.target;
    setProfileData({
      ...profileData,
      [id]: value,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (
      !profileData.firstname ||
      !profileData.lastname ||
      !profileData.email ||
      !profileData.age ||
      !profileData.contact ||
      !profileData.password
    ) {
      showServerMessage("Fields should not be empty");
      return;
    }

    if (profileData.email.endsWith(".iiit.ac.in") === false) {
      showServerMessage("Please enter a valid IIIT email");
      return;
    }
    axios
      .put("http://localhost:5000/profile", profileData, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        showServerMessage(res.data.message);
        console.log(res.data.message);
      })
      .catch((err) => {
        showServerMessage(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="overlord_container_dashboard">
      <Navbar />
      {showMessageDiv && <MessageDiv message={message} />}
      <div className="container_dashboard">
        <div className="addItemsHeader">Edit Profile</div>
        <form className="register-form_dashboard" onSubmit={handleEdit}>
          <div className="input_field_dashboard">
            <label className="svg-img_dashboard" htmlFor="fname">
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
              onChange={onChange}
              className="input_text_dashboard"
              value={profileData.firstname}
              type="text"
            />
          </div>
          <div className="input_field_dashboard">
            <label className="svg-img_dashboard" htmlFor="lname">
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
              onChange={onChange}
              className="input_text_dashboard"
              value={profileData.lastname}
              type="text"
            />
          </div>
          <div className="input_field_dashboard">
            <label className="svg-img_dashboard" htmlFor="email">
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
              onChange={onChange}
              className="input_text_dashboard"
              value={profileData.email}
              type="email"
              disabled={true}
            />
          </div>
          <div className="input_field_dashboard">
            <label className="svg-img_dashboard" htmlFor="age">
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
              onChange={onChange}
              className="input_text_dashboard"
              value={profileData.age}
              type="number"
            />
          </div>
          <div className="input_field_dashboard">
            <label className="svg-img_dashboard" htmlFor="number">
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
              onChange={onChange}
              className="input_text_dashboard"
              value={profileData.contact}
              type="number"
            />
          </div>
          <div className="input_field_dashboard">
            <label className="svg-img_dashboard" htmlFor="password">
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
              onChange={onChange}
              className="input_text_dashboard"
              value={profileData.password}
              type="password"
            />
          </div>

          <input className="submit_dashboard" type="submit" value="EDIT" />
        </form>
      </div>
      <div className="addItemsContainer">
        <div className="addItemsHeader">Sell Items</div>
        <AddItems popupFunction={showServerMessage} />
      </div>
    </div>
  );
}

export default Dashboard;
