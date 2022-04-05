import Chat from "./Chat";
import Discover from "./Discover";
import "./home.css";
import Profile from "./Profile";
import { UserContext } from "../contexts/user";
import { useContext, useState } from "react";
import Navbar from "./Navbar";

const Home = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [user] = useContext(UserContext);
  const friend = {
    avatar: "C:/Users/EliteBooK/Desktop/projects/chat-app/uploads/avatar.jpeg",
    username: "Felix",
    email: "Felix@gmail.com",
  };
  const exit_drop = () => {
    if (showDropDown) {
        setShowDropDown(false);
    }
}
  return (
    <div onClick={exit_drop} className="home">
        <Navbar setShowDropDown={setShowDropDown} showDropDown={showDropDown} />
      <div className="home-content">
        <Profile user={user} />
        <Chat friend={friend} />
        {/* <Discover user={user} /> */}
      </div>
    </div>
  );
};

export default Home;
