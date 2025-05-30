import React, { useState, useEffect } from "react";
import FacultyContext from "./FacultyContext";

const FacultyContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("facultyToken"));

  useEffect(() => {
    const checkSession = async () => {
      if (!token) return;

      try {
        const res = await fetch("https://collegeservermcabycocas.onrender.com/auth/faculty/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok && data.user) {
          setLoggedIn(true);
          setUser(data.user);
        } else {
          setLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Session check failed", error);
        setLoggedIn(false);
        setUser(null);
      }
    };

    checkSession();
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem("facultyToken", newToken);
    setToken(newToken);
    setUser(userData);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("facultyToken");
    setToken(null);
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <FacultyContext.Provider value={{ user, loggedIn, login, logout,token }}>
      {children}
    </FacultyContext.Provider>
  );
};

export default FacultyContextProvider;
