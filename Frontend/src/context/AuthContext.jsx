import { createContext, useState, useEffect } from "react";
import api from "../api/api";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
    } finally { setLoading(false); }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) fetchUser();
    else setLoading(false);
  }, []);
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};