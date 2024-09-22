import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import userSvg from "../assets/user.svg";

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  function logout() {
    auth.signOut();
    navigate("/");
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="sticky top-0 w-full p-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-custom flex justify-between items-center">
      {/* Logo / Title */}
      <p className="text-white font-bold text-2xl sm:text-3xl md:text-4xl m-0">
        FinTrack
      </p>

      {/* User Info / Logout */}
      {user ? (
        <p
          className="flex items-center text-gray-300 font-medium text-sm sm:text-base cursor-pointer hover:text-white transition-all"
          onClick={logout}
        >
          <span className="mr-2 sm:mr-4">
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              width={user.photoURL ? "36" : "28"}
              className="rounded-full"
              alt="User Avatar"
            />
          </span>
          Logout
        </p>
      ) : null}
    </div>
  );
}

export default Header;
