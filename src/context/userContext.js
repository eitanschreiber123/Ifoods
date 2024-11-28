"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("users");
      return storedUsers ? JSON.parse(storedUsers) : [];
    }
    return [];
  });

  const [activeUser, setActiveUserState] = useState(() => {
    if (typeof window !== "undefined") {
      const storedActiveUser = localStorage.getItem("activeUser");
      return storedActiveUser ? JSON.parse(storedActiveUser) : null;
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (activeUser) {
      localStorage.setItem("activeUser", JSON.stringify(activeUser))
    } else {
      localStorage.removeItem("activeUser")
    }
  }, [activeUser])

  const addUser = user => setUsers((prevUsers) => [...prevUsers, { ...user }]);

  const setActiveUser = (user) => setActiveUserState(user)

  const logout = () => setActiveUserState(null)

  return <UserContext.Provider value={{ users, activeUser, addUser, setActiveUser, logout }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};