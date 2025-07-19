import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const PrivateRoute = ({ children }) => {
  const { token } = useAppContext();
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
