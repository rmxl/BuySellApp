import "./myCart.css";
import Navbar from "../components/navbar/navbar";
import CartItems from "../components/cartItems/cartItems";
import axios from "axios";
import { useState, useEffect } from "react";
import MessageDiv from "../components/message/messageDiv";

function MyCart() {
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

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const removeCartItem = (id) => {
    axios
      .delete("http://localhost:5000/cart", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        data: {
          id: id,
        },
      })
      .then((response) => {
        showServerMessage(response.data.message);
        setCartItems(cartItems.filter((item) => item._id !== id));
      })
      .catch((error) => {
        showServerMessage(error.response.data.message);
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/cart", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        console.log(response);
        setCartItems(response.data.items);
      })
      .catch((error) => {
        showServerMessage(error.response.data.message);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setTotalPrice(0);
    cartItems.forEach((item) => {
      setTotalPrice((prev) => prev + item.price);
    });
  }, [cartItems]);

  const placeOrder = () => {
    axios
      .post(
        "http://localhost:5000/addPendingOrder",
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      .then((response) => {
        showServerMessage(response.data.message);
        setCartItems([]);
        console.log(response);
        for (let otp of response.data.otps) {
          const key = response.data.buyer_id + otp.id._id;
          console.log(key, otp.otp);
          localStorage.setItem(key, otp.otp);
        }
      })
      .catch((error) => {
        showServerMessage(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div className="overlord_container_my_cart">
      <Navbar />
      {showMessageDiv && <MessageDiv message={message} />}
      <div className="my_cart_container">
        <h1>My Cart</h1>
        {cartItems.length === 0 ? (
          <p>No Items in Cart</p>
        ) : (
          cartItems.map((item, index) => (
            <CartItems
              key={index}
              item={item}
              removeCartItem={removeCartItem}
            />
          ))
        )}
      </div>
      {cartItems.length == 0 ? (
        <></>
      ) : (
        <div className="order_my_cart">
          <p>Total Price: ₹ {totalPrice} </p>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default MyCart;
