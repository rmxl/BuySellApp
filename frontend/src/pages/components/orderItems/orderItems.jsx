import "./orderItems.css";

function OrderItems({ item, otp, category }) {
  return (
    <div className="overlord_container_orderItems">
      <div className="info_orderItems">
        <div className="name_orderItems">{item.item?.name}</div>
        <div className="price_orderItems">₹ {item.item?.price}</div>
        <div className="seller_orderItems">
          {category === "sold"
            ? item.buyer_id
              ? `Buyer: ${item.buyer_id.firstname} ${item.buyer_id.lastname}`
              : null
            : item.seller_id
            ? `Seller: ${item.seller_id.firstname} ${item.seller_id.lastname}`
            : null}
        </div>
        <div className="date_orderItems">
          {category === "pending"
            ? `Ordered on: ${new Date(item.timestamp).toDateString()}`
            : category === "bought"
            ? `Bought on: ${new Date(item.timestamp).toDateString()}`
            : category === "sold"
            ? `Sold on: ${new Date(item.timestamp).toDateString()}`
            : null}
        </div>
      </div>
      {category === "pending" && otp ? (
        <p className="otp_orderItems">OTP: {otp}</p>
      ) : null}
    </div>
  );
}

export default OrderItems;
