import "./discover.css";
import { useState } from "react";
import axios from "axios";
import User from "./User";
import image from "../assets/avatar.jpeg";
import { useNavigate } from "react-router-dom";

const Discover = (props) => {
  const [friends, setFriends] = useState([]);
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
  const search = async (username) => {
    await axios
      .get(`http://localhost:4000/search_users/${username}`)
      .then((res) => {
        setFriends(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="discover">
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
        <button>Change username</button>
        <button>Change profile picture</button>
        <button>Frriends List</button>
        <button>Find friends</button>
        <button>Friend requests</button>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="users">
        {friends &&
          friends.map((friend) => {
            return <User user={props.user} friend={friend} />;
          })}
      </div>
    </div>
  );
};

export default Discover;
