import Chat from "./Chat";
import "./home.css";
import Profile from "./Profile";
import { UserContext } from "../contexts/user";
import { useContext, useState } from "react";
import Navbar from "./Navbar";

const Home = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [activeChat, setActiveChat] = useState(false);
    const [activeProfile, setActiveProfile] = useState(true);
    const [user] = useContext(UserContext);
  const exit_drop = () => {
    if (showDropDown) {
        setShowDropDown(false);
    }
}
  return (
    <div onClick={exit_drop} className="home">
        <Navbar setShowDropDown={setShowDropDown} showDropDown={showDropDown} />
      <div className="home-content">
        <Profile activeProfile={activeProfile} setActiveChat={setActiveChat} setActiveProfile={setActiveProfile} user={user} />
        <Chat activeChat={activeChat} setActiveChat={setActiveChat} setActiveProfile={setActiveProfile} />
        {/* <Discover user={user} /> */}
      </div>
    </div>
  );
};

export default Home;
