import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("auth-token");

  if (!isLoggedIn) {
    console.log("Login kar")
    return <Navigate to="/login" />;
  }

  console.log("Logged in")

  return children;
};

export default PrivateRoute;
