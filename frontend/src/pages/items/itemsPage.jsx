import "./itemsPage.css";
import Navbar from "../components/navbar/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MessageDiv from "../components/message/messageDiv";

function ItemsPage() {
  const location = useLocation();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    seller_name: "",
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
    console.log(location.pathname.split("/")[2]);
    axios
      .get("http://localhost:5000/getItem", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        params: {
          id: location.pathname.split("/")[2],
        },
      })
      .then((res) => {
        setProduct(res.data.item);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        showServerMessage(err.response.data.message);
      });
  }, []);

  const addItemToCart = () => {
    axios
      .post(
        "http://localhost:5000/cart",
        {
          id: location.pathname.split("/")[2],
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      .then((res) => {
        showServerMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        showServerMessage(err.response.data.message);
      });
  };

  return (
    <div className="overlord_container_items_page">
      <Navbar />
      {showMessageDiv && <MessageDiv message={message} />}
      <div className="items_container">
        <div className="item_name">{product.name}</div>
        <div className="item_price">
          <span className="span_items">Price:</span> ₹ {product.price}
        </div>
        <div className="item_category">
          <span className="span_items">Category:</span> {product.category}
        </div>
        <div className="item_seller">
          <span className="span_items">Seller:</span> {product.seller_name}
        </div>
        <div className="item_description">
          <span className="span_items">Description:</span> {product.description}
        </div>
        <button className="add_item_button" onClick={addItemToCart}>
          Add Item To Cart
        </button>
      </div>
    </div>
  );
}

export default ItemsPage;
