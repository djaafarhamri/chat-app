import "./discover.css";
import { useState } from "react";
import axios from "axios";
import User from "./User";
import image from "../assets/avatar.jpeg";
import { useNavigate } from "react-router-dom";
import ChangeName from "./ChangeName";
import FindFriends from "./FindFriends";
import FriendRequests from "./FriendRequests";
import FriendsList from "./FriendsList";
import Picture from "./Picture";

const Discover = (props) => {
  //setShowChangeName
  const [showChangeName, setShowChangeName] = useState(false);
  //setShowPicture
  const [showPicture, setShowPicture] = useState(false);
  //showfind
  const [showFind, setShowFind] = useState(false);
  //show requests
  const [showRequests, setShowRequests] = useState(false);
  //show friends list
  const [showList, setShowList] = useState(false);
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
      {showPicture && <Picture setShowPicture={setShowPicture} />}
      {showFind && <FindFriends setShowFind={setShowFind} />}
      {showRequests && <FriendRequests setShowRequests={setShowRequests} />}
      {showList && <FriendsList setShowList={setShowList} />}
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
        <button
          onClick={() => {
            setShowPicture(true);
          }}
          
        >Change profile picture</button>
        <button onClick={() => {setShowList(true)}}>
          Frriends List
          </button>
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
