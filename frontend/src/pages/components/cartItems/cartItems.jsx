import "./cartItems.css";

function CartItems({ item, removeCartItem }) {
  return (
    <div className="overlord_container_cartItems">
      <div className="info_cartItems">
        <div className="name_cartItems">{item.name}</div>
        <div className="price_cartItems">₹ {item.price}</div>
      </div>
      <button
        className="remove_cartItems"
        onClick={() => {
          removeCartItem(item._id);
        }}
      >
        Remove From Cart
      </button>
    </div>
  );
}

export default CartItems;
