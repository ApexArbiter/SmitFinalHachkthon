import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/api/apiConfig";

const TOKEN_KEY = "jwt";
const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: false,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log(token)

      if (token) {
        setAuthState({ token, authenticated: true });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };
    loadToken();
  }, []);

  const register = async (fullname, email, password) => {
    try {
      console.log("register");
      const response = await axios.post(`${API_URL}/signup`, {
        fullname,
        email,
        password,
      });
      return response.data;
    } catch (e) {
      return { error: true, msg: e.message };
    }
  };

  const login = async (email, password) => {
    //prettier-ignore
    try {
      console.log("login")
      const response = await axios.post(`${API_URL}/signin`, { email, password });
      if (!response.data.error) {
        console.log(response.data.token)
        setAuthState({ token: response.data.token, authenticated: true });
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
      }
      return response.data;
    } catch (e) {
      return { error: true, msg: e.message };
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      axios.defaults.headers.common["Authorization"] = "";
      setAuthState({ token: null, authenticated: false });
    } catch (e) {
      return { error: true, msg: "Logged out" };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
