import "./orders.css";
import MessageDiv from "../components/message/messageDiv";
import Navbar from "../components/navbar/navbar";
import axios from "axios";
import OrderItems from "../components/orderItems/orderItems";
import { useState, useEffect, useRef } from "react";

function Orders() {
  // MESSAGE POPUP LOGIC START

  const [showMessageDiv, setShowMessageDiv] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("pending");
  const [searchResults, setSearchResults] = useState([]);
  const buyerId = useRef("");

  const showServerMessage = (message) => {
    setMessage(message);
    console.log(message);
    setShowMessageDiv(true);
    setTimeout(() => {
      setShowMessageDiv(false);
    }, 5000);
  };

  // MESSAGE POPUP LOGIC END

  const toggleCategory = (category) => {
    setSelectedCategory(() => category);
    console.log(category);
    axios
      .get("http://localhost:5000/getOrders", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        params: {
          category: category,
        },
      })
      .then((res) => {
        console.log(res.data.orders);
        setSearchResults(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
        showServerMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/getOrders", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        params: {
          category: "pending",
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

  useEffect(() => {
    axios
      .get("http://localhost:5000/id", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        buyerId.current = res.data.id;
      })
      .catch((err) => {
        console.log(err);
        showServerMessage(err.response.data.message);
      });
  }, []);

  return (
    <div className="overlord_container_orders">
      <Navbar />
      {showMessageDiv && <MessageDiv message={message} />}
      <div className="orders_container">
        <div className="filter_bar">
          <p>Filter :</p>
          <div className="multi_select">
            <div
              className={`category_orders ${
                selectedCategory.includes("pending") ? "selected" : ""
              }`}
              onClick={() => toggleCategory("pending")}
            >
              Pending Orders
            </div>
            <div
              className={`category_orders ${
                selectedCategory.includes("bought") ? "selected" : ""
              }`}
              onClick={() => toggleCategory("bought")}
            >
              Items Bought
            </div>
            <div
              className={`category_orders ${
                selectedCategory.includes("sold") ? "selected" : ""
              }`}
              onClick={() => toggleCategory("sold")}
            >
              Items Sold
            </div>
          </div>
        </div>
        <div className="orders_results">
          {!searchResults || searchResults.length === 0 ? (
            <p>No items {selectedCategory}</p>
          ) : (
            searchResults.map((item, index) => {
              console.log(buyerId.current + item._id);
              return (
                <OrderItems
                  key={index}
                  category={selectedCategory}
                  item={item}
                  otp={localStorage.getItem(buyerId.current + item.item._id)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
