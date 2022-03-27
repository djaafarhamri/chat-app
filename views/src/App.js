import './App.css';
import Register from './Componants/Register';
import { Routes, Route } from 'react-router-dom';
import Login from './Componants/Login';
import Home from './Componants/Home';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
