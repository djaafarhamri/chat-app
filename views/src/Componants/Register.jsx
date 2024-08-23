import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sign_up = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/user/sign_up`, { username, email, password })
      .then((res) => {
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div
      className="register"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          sign_up();
        }
      }}
    >
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <div className="form">
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={sign_up}>Sign Up</button>
            <p>
              Already have an account <Link to="/sign-in">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
