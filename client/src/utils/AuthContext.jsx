import axios from "axios";
import { children, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (LoginInfo) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/auth/login",
        LoginInfo
      );
      setUser(response.data.data.username);
      localStorage.setItem("userToken", response.data.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
