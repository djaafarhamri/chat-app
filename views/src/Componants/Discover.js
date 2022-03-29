import "./discover.css";
import { useState } from "react";
import axios from "axios";
import User from "./User";
import image from "../assets/avatar.jpeg";
import { useNavigate } from "react-router-dom";
import ChangeName from "./ChangeName";
import FindFriends from "./FindFriends";
import FriendRequests from "./FriendRequests";

const Discover = (props) => {
  //setShowChangeName
  const [showChangeName, setShowChangeName] = useState(false);
  //showfind
  const [showFind, setShowFind] = useState(false);
  //show requests
  const [showRequests, setShowRequests] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const navigate = useNavigate();
  const logout = async () => {
    await axios
      .get("http://localhost:4000/logout", { withCredentials: true })
      .then((res) => {
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="discover">
      {showChangeName && <ChangeName setShowChangeName={setShowChangeName} />}
      {showFind && <FindFriends setShowFind={setShowFind} />}
      {showRequests && <FriendRequests setShowRequests={setShowRequests} />}
      <div className="profile-info">
        {/* <img src={props.user.avatar} alt="" /> */}
        <img src={image} alt="" />
        <h3>{props.user.username}</h3>
      </div>
      {/* <input
        type="text"
        placeholder="Search for a user"
        onChange={(e) => {
          search(e.target.value);
        }}
      /> */}
      <div className="options">
        <button
          onClick={() => {
            setShowChangeName(true);
          }}
        >
          Change username
        </button>
        <button>Change profile picture</button>
        <button>Frriends List</button>
        <button
          onClick={() => {
            setShowFind(true);
          }}
        >
          Find Friends
        </button>
        <button
          onClick={() => {
            setShowRequests(true);
          }}
        >
          Friend Requests
        </button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Discover;
