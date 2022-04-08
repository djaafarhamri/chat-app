import "./profile.css";
import Friend from "./Friend";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";

const Profile = (props) => {
  const [user] = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/get_friends/${user.username}`)
      .then((res) => {
        setFriends(res.data.friends);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      //
    };
  }, [user.username]);

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
