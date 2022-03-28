import "./discover.css";
import { useState } from "react";
import axios from "axios";
import User from "./User";

const Discover = (props) => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

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
      <input
        type="text"
        placeholder="Search for a user"
        onChange={(e) => {
          search(e.target.value);
        }}
      />
      <div className="friends">
        {friends &&
          friends.map((friend) => {
            return <User user={props.user} friend={friend} />;
          })}
      </div>
    </div>
  );
};

export default Discover;
