'use client'
import React, { createContext, useState, useEffect } from 'react';

// Create the context

type UserContextType = {
    userStatus: boolean;
    setUserStatus: (status: boolean) => void;
    logout: () => void;
  };

  const defaultValue: UserContextType = {
    userStatus: false,
    setUserStatus: () => {},
    logout: () => {},
  };
export const UserContext = createContext<UserContextType>(defaultValue);

// UserContext Provider Component
export const UserProvider = ({ children}:{children:any}) => {
  const [userStatus, setUserStatus] = useState(false);

  // Check localStorage for a token and fetch user data
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Decode token or use it to fetch user data if required
      // const userData = JSON.parse(atob(token.split('.')[1])); // Basic decoding for demonstration
      setUserStatus(true);
    }
  }, []);

  // Logout Function
  const logout = () => {
    localStorage.removeItem('authToken');
    setUserStatus(false);
  };

  return (
    <UserContext.Provider value={{ userStatus, setUserStatus, logout }}>
      {children}
    </UserContext.Provider>
  );
};