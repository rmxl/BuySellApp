import "./navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="site_name" onClick={() => navigate("/dashboard")}>
        Buy, Sell @ IIITH
      </div>
      <div className="nav_links">
        <button className="nav_button" onClick={() => navigate("/search")}>
          Search
        </button>
        <button className="nav_button" onClick={() => navigate("/orders")}>
          Orders
        </button>
        <button
          className="nav_button"
          onClick={() => {
            navigate("/deliver");
          }}
        >
          Deliver
        </button>
        <button
          className="nav_button"
          onClick={() => {
            navigate("/cart");
          }}
        >
          My Cart
        </button>
        <button className="nav_button" onClick={() => navigate("/support")}>
          Support
        </button>
        <button className="nav_button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
