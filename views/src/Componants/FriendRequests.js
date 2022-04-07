import "./friendRequests.css";
import { useState } from "react";
import FriendRequest from "./FriendRequest";

const FriendRequests = (props) => {

  const [render, setRender] = useState([]);

 
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
          {props.friendRequests &&
            props.friendRequests.map((friend, index) => {
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
