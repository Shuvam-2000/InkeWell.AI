import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-28 cursor-pointer border-b border-gray-200">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl sm:text-3xl font-bold text-indigo-600"
      >
        InkWell.<span className="text-gray-800">AI</span>
      </h1>
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl transition duration-300 cursor-pointer"
      >
        Login
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Navbar;
