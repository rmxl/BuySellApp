import "./deliverItems.css";
import axios from "axios";
import { set } from "mongoose";
import { useState } from "react";

function DeliverItems({ item, showServerMessage, setSearchResults }) {
  const [otp, setOtp] = useState("");
  const changeOtp = (e) => {
    setOtp(e.target.value);
  };

  const sellItem = () => {
    console.log(item);
    axios
      .post(
        "http://localhost:5000/confirmOrder",
        {
          buyer_id: item.buyer_id._id,
          item_id: item.item._id,
          otp: otp,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      .then((res) => {
        showServerMessage(res.data.message);
        console.log(res.data.message);
        setSearchResults((prev) => {
          return prev.filter((i) => {
            return i.item._id !== item.item._id;
          });
        });
        localStorage.removeItem(item.buyer_id._id + item.item._id);
      })
      .catch((err) => {
        showServerMessage(err.response.data.message);
        console.log(err.response.data.message);
      });
  };
  return (
    <div className="overlord_container_deliverItems">
      <div className="info_deliverItems">
        <div className="name_deliverItems">{item.item.name}</div>
        <div className="price_deliverItems">₹ {item.item.price}</div>
        <div className="buyer_deliverItems">
          Buyer: {item.buyer_id.firstname} {item.buyer_id.lastname}
        </div>
        <div className="date_deliverItems">
          Ordered on: {new Date(item.timestamp).toDateString()}
          </div>
      </div>
      <div className="input_otp_deliverItems">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={changeOtp}
        />
        <button onClick={sellItem}>Deliver</button>
      </div>
    </div>
  );
}

export default DeliverItems;
