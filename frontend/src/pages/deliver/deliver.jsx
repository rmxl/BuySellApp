import "./deliver.css";
import MessageDiv from "../components/message/messageDiv";
import Navbar from "../components/navbar/navbar";
import axios from "axios";
import DeliverItems from "../components/deliverItems/deliverItems";
import { useState, useEffect } from "react";

function Deliver() {
  // MESSAGE POPUP LOGIC START

  const [showMessageDiv, setShowMessageDiv] = useState(false);
  const [message, setMessage] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
      .get("http://localhost:5000/getOrdersSell", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        setSearchResults(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
        showServerMessage(err.response.data.message);
      });
  }, []);

  return (
    <div className="overlord_container_deliver">
      <Navbar />
      {showMessageDiv && <MessageDiv message={message} />}
      <div className="deliver_container">
        <div className="deliver_results">
          {!searchResults || searchResults.length === 0 ? (
            <p>No items to be sold</p>
          ) : (
            searchResults.map((item, index) => {
              return (
                <DeliverItems
                  key={index}
                  item={item}
                  showServerMessage={showServerMessage}
                  setSearchResults={setSearchResults}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Deliver;
