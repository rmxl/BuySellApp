import { Navigate } from "react-router-dom";

const SetToken = (token) => {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenSet = urlParams.get("token");
  if (tokenSet) {
    localStorage.setItem("auth-token", tokenSet);
    return <Navigate to="/dashboard" />;
  }
  return <Navigate to="/login" />;
};

export default SetToken;
