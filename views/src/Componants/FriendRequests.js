import "./friendRequests.css";
import { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "../contexts/user";
import axios from "axios";
import FriendRequest from "./FriendRequest";

const FriendRequests = (props) => {
  const [user] = useContext(UserContext);

  const [render, setRender] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    axios
    .get(`http://localhost:4000/get_friendRequests/${user.username}`)
    .then((res) => {
      setFriendRequests(res.data.friendRequests);
    })
    .catch((err) => {
      console.log(err);
    });
    
    return () => {
      // cleanup
    };
  }, [user.username, render]);

  return (
    <>
      <div
        onClick={() => {
          props.setShowRequests(false);
        }}
        className="friend-requests"
      ></div>

      <div className="friend-requests-content">
        <h2>Friend Requests</h2>
        <div className="users">
          {friendRequests &&
            friendRequests.map((friend, index) => {
              return (
                <div key={index}>
                  <FriendRequest
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

export default FriendRequests;
