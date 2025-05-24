import { useState, useEffect } from "react";
import "./search.css";
import axios from "axios";
import Navbar from "../components/navbar/navbar";
import MessageDiv from "../components/message/messageDiv";
import ItemCard from "../components/itemcard/itemCard";
import { set } from "mongoose";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "Electronics",
    "Clothing",
    "Grocery",
    "Study Materials",
    "Other",
  ];
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const searchItems = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:5000/getItems", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        params: {
          searchQuery: searchQuery,
          categories: selectedCategories,
        },
      })
      .then((res) => {
        setSearchResults(res.data.items);
      })
      .catch((err) => {
        console.log(err);
        showServerMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/getItems", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        params: {},
      })
      .then((res) => {
        setSearchResults(res.data.items);
      })
      .catch((err) => {
        console.log(err);
        showServerMessage(err.response.data.message);
      });
  }, []);

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

  return (
    <div className="overlord_container_search">
      <Navbar />
      {showMessageDiv && <MessageDiv message={message} />}
      <div className="container_search">
        <form className="search_bar" onSubmit={(e) => searchItems(e)}>
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            type="text"
            placeholder="Search for products"
          />
          <button>Search</button>
        </form>
        <div className="filter_bar">
          <p>Filter by Category:</p>
          <div className="multi_select">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`category_option ${
                  selectedCategories.includes(category) ? "selected" : ""
                }`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
        <div className="search_results">
          {searchResults === undefined || searchResults.length == 0 ? (
            <p>No results found</p>
          ) : (
            searchResults.map((item, index) => {
              return <ItemCard key={index} item={item} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
