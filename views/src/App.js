import "./App.css";
import Register from "./Componants/Register";
import { Routes, Route } from "react-router-dom";
import Login from "./Componants/Login";
import Home from "./Componants/Home";
import PrivateRoute from "./Componants/PrivateRoute";
import { UserProvider } from "./contexts/user";
import { FriendProvider } from "./contexts/friends";
import { RoomProvider } from "./contexts/room";
import { SocketContext } from "./contexts/socket";
import { socket } from "./contexts/socket";
import Picture from "./Componants/Picture";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <SocketContext.Provider value={socket}>
          <FriendProvider>
            <RoomProvider>
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
                <Route exact path="/picture" element={<Picture />}></Route>
              </Routes>
            </RoomProvider>
          </FriendProvider>
        </SocketContext.Provider>
      </UserProvider>
    </div>
  );
}

export default App;
