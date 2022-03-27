import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:4000/check-user", { withCredentials: true })
      .then((res) => {
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch((err) => {
        navigate("/sign-in");
      });
  }, [isAuthenticated, isLoading, navigate]);

  return isLoading ? <p>loading...</p> : children;
};

export default PrivateRoute;
