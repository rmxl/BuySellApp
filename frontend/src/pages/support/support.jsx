import "./support.css";
import Navbar from "../components/navbar/navbar";
import axios from "axios";
import { useState } from "react";
import MessageDiv from "../components/message/messageDiv";

function Support() {
  // MESSAGE POPUP LOGIC START

  const [showMessageDiv, setShowMessageDiv] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const showServerMessage = (message) => {
    setServerMessage(message);
    console.log(message);
    setShowMessageDiv(true);
    setTimeout(() => {
      setShowMessageDiv(false);
    }, 5000);
  };

  // MESSAGE POPUP LOGIC END

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([{}]);

  const updateMessages = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    setMessages([
      ...messages,
      { role: "user", content: message },
      { role: "chatbot", content: "..." },
    ]);

    axios
      .post(
        "http://localhost:5000/getSupportGemini",
        { history: history, message: message },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      .then((response) => {
        setMessages([
          ...messages,
          { role: "user", content: message },
          { role: "chatbot", content: response.data.message },
        ]);
        setMessage("");

        setHistory([
          ...history,
          { user: message, chatbot: response.data.message },
        ]);
      })
      .catch((error) => {
        showServerMessage(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div className="overlord_container_support">
      <Navbar />
      {showMessageDiv && <MessageDiv message={serverMessage} />}
      <div className="messages_support">
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={`message_support ${message.role}_message`}
            >
              {message.content}
            </div>
          );
        })}
      </div>
      <div className="send_message_support">
        <input
          type="text"
          value={message}
          onChange={updateMessages}
          className="input_support"
          placeholder="Type your message here"
        />
        <button className="send_button_support" onClick={sendMessage} onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Support;
