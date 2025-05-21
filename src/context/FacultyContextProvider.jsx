import React, { useState } from 'react'
import FacultyContext from './FacultyContext'
import { useEffect } from 'react';
const FacultyContextProvider = ({children}) => {
    const [user, setUser]= useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const checkSession = async () => {
          try {
            const res = await fetch("https://collegeservermcabycocas.onrender.com/auth/faculty-session", {
              credentials: "include",
            });
            const data = await res.json();
            if (res.ok && data.user) {
              setLoggedIn(true);
              setUser(data.user);
            }
          } catch (error) {
            console.error("Session check failed", error);
          }
        };
        checkSession();
      }, []);
  return (
    <FacultyContext.Provider value={{user,setUser,loggedIn,setLoggedIn}}>
    {children}
    </FacultyContext.Provider>
  )
}

export default FacultyContextProvider;