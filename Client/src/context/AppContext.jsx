import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Set base URL globally for all axios requests
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // State for storing the auth token
  const [token, setTokenState] = useState(null);

  // State for storing all blogs
  const [blogs, setBlogs] = useState([]);

  // State for input filtering
  const [input, setInput] = useState("");

  // Custom setToken function
  const setToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `${token}`;
      setTokenState(token);
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setTokenState(null);
    }
  };

  // Fetch blogs from backend
  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get("/api/blog/getblogs");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // On initial load, fetch blogs and token from localStorage
  useEffect(() => {
    fetchBlogData();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // This will also set axios header and state
    }
  }, []);

  // logout functionality
  const logout = () => {
    setToken(null);
    toast.success("Logged out Successfully")
    navigate("/login")
  }

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
