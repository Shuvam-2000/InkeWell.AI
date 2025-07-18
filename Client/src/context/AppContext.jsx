import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // state for storing the auth token
  const [token, setToken] = useState(null);

  // state for storing the blogs
  const [blogs, setBlogs] = useState([]);

  // stae for filtering the blogs
  const [input, setInput] = useState("");

  // function to fetch blogs data from the database
  const fetchBlogData = async () => {
    try {
      const {data} = await axios.get('/api/blog/getblogs');
      data.success ? setBlogs(data.blogs) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogData();
    const token = localStorage.getItem('token')
    if(token){
      setToken(token)
      axios.defaults.headers.common['Authorization'] = `${token}`
    }
  },[])

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };
  return <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
