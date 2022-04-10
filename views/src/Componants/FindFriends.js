import User from "./User";
import "./findFriends.css";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/user";

const FindFriends = (props) => {
  const [user] = useContext(UserContext);
  const [friends, setFriends] = useState([]);

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
    <>
      <div
        onClick={() => {
          props.setShowFind(false);
        }}
        className="find-friends"
      ></div>
      <div className="find-friends-content">
        <h2>Find Friends</h2>
        <div className="find-friends-search-bar">
          <input
            type="text"
            placeholder="Search for a user"
            onChange={(e) => {
              search(e.target.value);
            }}
          />
        </div>
        <div className="users">
          {friends &&
            friends.map((friend) => {
              return <User type='user' user={user} friend={friend} />;
            })}
        </div>
      </div>
    </>
  );
};

export default FindFriends;
