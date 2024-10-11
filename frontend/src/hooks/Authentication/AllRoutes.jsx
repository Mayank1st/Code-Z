import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import VerifyEmail from "../../components/Authentication/User/VerifyEmail";
import Register from "../../components/Authentication/User/Register";
import Home from "../../components/Authentication/User/Home";
import Login from "../../components/Authentication/User/Login";
import UserProfile from "../../components/Authentication/User/UserProfile";
import Logout from "../../components/Authentication/User/Logout";
import Navbar from "../../components/Authentication/User/Navbar";
import Footer from "../../components/Authentication/User/Footer";
import ForgotPassword from "../../components/Authentication/User/ForgotPassword";
import ResetPassword from "../../components/Authentication/User/ResetPassword";
import InvalidPage from "../../components/Authentication/User/InvalidPage";
import ProfileSettings from "../../components/Authentication/User/ProfileSettings";
// import Lobby from "../../components/Gameplay/LudoGame/Lobby";
// import JoinRoom from "../../components/Gameplay/LudoGame/JoinRoom";
// import CreatorPetName from "../../components/Gameplay/LudoGame/CreatorPetName";
import CodeEditor from "../../components/CodeBlock/CodeEditor";
import CodeEditorOuter from "../../components/CodeBlock/CodeEditorOuter";
import JoinCodeEditorRoom from "../../components/CodeBlock/JoinCodeEditorRoom";

function ProtectedRoute({ children }) {
  const isAuth = Cookies.get("is_auth") || localStorage.getItem("is_auth");
  console.log(isAuth);

  if (isAuth !== "true") {
    // Use strict equality
    return <Navigate to="/login" />;
  }

  return children;
}

function AllRoutes() {
  const location = useLocation();

  // Determine if the current route is UserProfile, ProfileSettings, or CodeEditor
  const isUserProfile = location.pathname === "/user-profile";
  const isProfileSettings = location.pathname === "/profile-settings";
  const isCodeEditorOuter = location.pathname === "/code-editor";

  return (
    <div>
      {/* Conditionally render Navbar */}
      {!isUserProfile && !isProfileSettings && !isCodeEditorOuter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-settings"
          element={
            // <ProtectedRoute>
            <ProfileSettings />
            // </ProtectedRoute>
          }
        />

        {/* GamePlay Routes */}
        {/* Creator PetName section */}
        {/* <Route path="/creator-pet-name/:room_id" element={<CreatorPetName />} /> */}
        {/* <Route
          path="/participent-pet-name/:room_id"
          element={<CreatorPetName />}
        /> */}

        {/* change the path to "/gameplay/_game_name/lobby" */}
        {/* <Route
          path="/lobby"
          element={
            // <ProtectedRoute>
            <Lobby />
            // </ProtectedRoute>
          }
        /> */}

        <Route path="/join-code-editor-room" element={<JoinCodeEditorRoom />} />

        {/* Fallback for invalid routes */}
        <Route path="*" element={<InvalidPage />} />

        {/* Code Editor */}
        <Route path="/code-editor" element={<CodeEditorOuter />} />
      </Routes>

      {!isUserProfile && <Footer />}
      {/* {!isProfileSettings && <Footer />} */}
    </div>
  );
}

export default AllRoutes;
