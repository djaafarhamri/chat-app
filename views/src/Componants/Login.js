import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/user";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [setUser] = useContext(UserContext);

  const sign_in = () => {
    axios
      .post(
        "http://localhost:4000/sign_in",
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data === "error") return console.log("error");
        setUser(res.data.user);
        return navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div
      className="login"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          sign_in();
        }
      }}
    >
      <div className="container">
        <div className="form-container sign-in-container">
          <div className="form">
            <h1>Sign in</h1>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Link to="/reset">Forgot your password?</Link>
            <button onClick={sign_in}>Sign In</button>
            <p>
              don't have an account yet <Link to="/sign-up">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
