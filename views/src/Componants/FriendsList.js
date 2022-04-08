import "./friendsList.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/user";
import axios from "axios";
import FriendList from "./FriendList";
import { FriendContext } from "../contexts/friends";

const FriendsList = (props) => {
  const [user] = useContext(UserContext);

  const [render, setRender] = useState([]);
  const [friends, setFriends] = useContext(FriendContext);
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
                  <FriendList
                    render={render}
                    setRender={setRender}
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
