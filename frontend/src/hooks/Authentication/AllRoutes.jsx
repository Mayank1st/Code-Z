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
import CodeEditorOuter from "../../components/CodeBlock/CodeEditorOuter";
import JoinCodeEditorRoom from "../../components/CodeBlock/JoinCodeEditorRoom";
import About from "../../components/Authentication/User/AboutSection/About";
import UpgradeToPro from "../../components/Authentication/User/UpgradeSection/UpgradeToPro";
import Courses from "../../components/Authentication/User/CoursesSection/Courses";

function ProtectedRoute({ children }) {
  const isAuth = Cookies.get("is_auth") || localStorage.getItem("is_auth");

  if (isAuth !== "true") {
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
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/join-code-editor-room"
          element={
            <ProtectedRoute>
              <JoinCodeEditorRoom />
            </ProtectedRoute>
          }
        />
        {/* Code Editor */}
        <Route
          path="/code-editor"
          element={
            <ProtectedRoute>
              <CodeEditorOuter />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/upgrade"
          element={
            <ProtectedRoute>
              <UpgradeToPro />
            </ProtectedRoute>
          }
        />

        {/* Fallback for invalid routes */}
        <Route path="*" element={<InvalidPage />} />
      </Routes>

      {/* Conditionally render Footer */}
      {!isUserProfile && !isProfileSettings && <Footer />}
    </div>
  );
}

export default AllRoutes;
