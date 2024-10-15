import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Clear cookies related to authentication if needed
    document.cookie =
      "is_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to the homepage
    navigate("/");
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
