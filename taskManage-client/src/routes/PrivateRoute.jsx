import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading)
    return (
      <div className="flex justify-center items-center text-cyan-400 mt-44">
        <HashLoader size={70} color="#0fcfd5" />
      </div>
    );
  if (user) return children;
  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export default PrivateRoute;
