import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="container">
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <Link to="/reset">Forgot your password?</Link>
            <button>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
