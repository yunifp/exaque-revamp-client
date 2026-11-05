import React, { createContext, useState, useEffect, useContext } from "react";
import useApi from "../hooks/UseApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const { request } = useApi();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await request("/auth/me");
        if (response && response.data && response.data.user) {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (error) {
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setIsInitialized(true);
      }
    };

    checkUserLoggedIn();
  }, [request]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await request("/auth/logout", "POST");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isInitialized }}>
      {isInitialized ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);