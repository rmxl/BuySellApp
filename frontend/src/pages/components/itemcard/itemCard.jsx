import "./itemCard.css";
import { Link } from "react-router-dom";

function ItemCard({ item }) {
  return (
    <Link to={`/items/${item._id}`} className="item_card">
      <div className="item_card_1">
        <p>{item.name}</p>
        <p>₹ {item.price}</p>
        <p>{item.category}</p>
      </div>
      <div className="item_card_3">Seller : {item.seller_name}</div>
    </Link>
  );
}

export default ItemCard;
