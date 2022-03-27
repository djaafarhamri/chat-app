import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sign_in = () => {
    axios.post("http://localhost:4000/sign_in", {useCredentials: true})
    .then(res => {
      if (res.data === 'error') return setError('error');)})
      return navigate("/");
    .catch(err => {setError(err.message)})
  }
  return (
    <div className="login">
      <div className="container">
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
            <Link to="/reset">Forgot your password?</Link>
            <button onClick={sign_in}>Sign In</button>
            <p>
              don't have an account yet <Link to="/sign-up">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
