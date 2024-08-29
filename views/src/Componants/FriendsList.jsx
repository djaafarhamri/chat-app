import "./friendsList.css";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/user";
import { FriendContext } from "../contexts/friends";
import User from "./User";
import axios from "axios";

const FriendsList = (props) => {
  const [user] = useContext(UserContext);
  const [render, setRender] = useState([]);
  const [friends, setFriends] = useContext(FriendContext);
  const remove = async (friend) => {
    await axios
      .post(`/api/user/delete_friend`, {
        user,
        friend,
      })
      .then((res) => {
        setRender(!render);
        setFriends((old) => [
          ...old.filter((f) => f.username !== friend.username),
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        onClick={() => {
          props.setShowList(false);
        }}
        className="friends-list"
      ></div>

      <div className="friends-list-content">
        <h2>Friend list</h2>
        <div className="friends-list-users">
          {friends &&
            friends.map((friend, index) => {
              return (
                <div key={index}>
                  <User
                    remove={() => remove(friend)}
                    type='friend-list'
                    friend={friend}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default FriendsList;
