import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

const PrivateRoute = ({ children }) => {
  const [setUser] = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:4000/check-user", { withCredentials: true })
      .then((res) => {
        setIsAuthenticated(true);
        setIsLoading(false);
        setUser(res.data.user);
      })
      .catch((err) => {
        navigate("/sign-in");
      });
  }, [isAuthenticated, isLoading, navigate, setUser]);

  return isLoading ? <p>loading...</p> : children;
};

export default PrivateRoute;
