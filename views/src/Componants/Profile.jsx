import "./profile.css";
import Friend from "./Friend";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { FriendContext } from "../contexts/friends";

const Profile = (props) => {
  const [user] = useContext(UserContext);
  const [friends, setFriends] = useContext(FriendContext);
  const [active, setActive] = useState("");

  useEffect(() => {
    axios
      .get(`/api/user/get_friends/${user.username}`)
      .then((res) => {
        setFriends(res.data.friends);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      //
    };
  }, [setFriends, user.username]);

  return (
    <div
      className={`profile ${!props.activeProfile && "inactive-profile"} ${
        props.activeProfile && "active-profile"
      }`}
    >
      <div className="chats">
        {/* <input type="text" placeholder="Search Friends" /> */}
        {friends &&
          friends.map((friend, id) => (
            <div
              onClick={() => {
                setActive(friend.username);
                props.setActiveProfile(false);
                props.setActiveChat(true);
              }}
              style={{ width: "100%" }}
              key={id}
            >
              <Friend active={active} friend={friend} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
