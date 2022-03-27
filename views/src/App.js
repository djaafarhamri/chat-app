import "./App.css";
import Register from "./Componants/Register";
import { Routes, Route } from "react-router-dom";
import Login from "./Componants/Login";
import Home from "./Componants/Home";
import PrivateRoute from "./Componants/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route exact path="/sign-up" element={<Register />}></Route>
        <Route exact path="/sign-in" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
