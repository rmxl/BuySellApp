import "./addItems.css";
import axios from "axios";
import { useState } from "react";

function AddItems(props) {
  const categories = [
    "Electronics",
    "Clothing",
    "Grocery",
    "Study Materials",
    "Other",
  ];

  const [postData, setPostData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Electronics",
  });

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !postData.name ||
      !postData.price ||
      !postData.description ||
      !postData.category
    ) {
      props.popupFunction("Fields should not be empty");
      return;
    }

    axios
      .post("http://localhost:5000/addItems", postData, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        props.popupFunction(res.data.message);
        console.log(res.data.message);
      })
      .catch((err) => {
        props.popupFunction(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="container_addItems">
      <form className="addItems-form" onSubmit={handleSubmit}>
        <div className="input_field_addItems">
          <label className="svg-img_addItems" htmlFor="Name">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              height="15px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="7" r="4"></circle>
              <path d="M5.5 20a7.5 7.5 0 0 1 13 0"></path>
            </svg>
          </label>
          <input
            id="name"
            onChange={handleChange}
            value={postData.name}
            className="input_text_addItems"
            placeholder="Name"
            type="text"
          />
        </div>
        <div className="input_field_addItems">
          <label className="svg-img_addItems" htmlFor="Price">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-currency-rupee"
              viewBox="0 0 16 16"
            >
              <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
            </svg>
          </label>
          <input
            id="price"
            onChange={handleChange}
            value={postData.price}
            className="input_text_addItems"
            placeholder="Price"
            type="number"
          />
        </div>
        <div className="input_field_addItems">
          <label className="svg-img_addItems" htmlFor="Description">
            <svg x="0px" y="0px" width="15px" height="15px">
              <g>
                <path
                  fill="#B1B7C4"
                  d="M0 0H15V1H0z M0 2H10V3H0z M0 4H7V5H0z"
                />
              </g>
            </svg>
          </label>
          <textarea
            id="description"
            onChange={handleChange}
            value={postData.description}
            className="input_text_addItems"
            placeholder="Description"
            type="text"
          />
          <div className="input_field_addItems">
            <label className="svg-img_addItems" htmlFor="Category">
              <svg x="0px" y="0px" width="15px" height="5px">
                <g>
                  <path
                    fill="#B1B7C4"
                    d="M0 0H3V3H0z M6 0H9V3H6z M12 0H15V3H12z M0 3H3V6H0z M6 3H9V6H6z M12 3H15V6H12z"
                  />
                </g>
              </svg>
            </label>
            <select
              id="category"
              onChange={handleChange}
              value={postData.category}
              className="input_text_addItems"
              placeholder="Category"
              style={{ display: "inline-block", height: "60px" }}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <input className="submit_addItems" type="submit" value="SELL" />
      </form>
    </div>
  );
}

export default AddItems;
