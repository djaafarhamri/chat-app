import "./friendRequests.css";
import User from "./User";
import axios from "axios";
import { UserContext } from "../contexts/user";
import { FriendContext } from "../contexts/friends";
import { useContext } from "react";
import { socket } from "../contexts/socket";

const FriendRequests = (props) => {
  const [user] = useContext(UserContext);
  const [friends, setFriends] = useContext(FriendContext);
  // accept request
  const accept = async (friend) => {
    await axios
      .post(`/api/user/accept_request`, {
        user,
        friend,
      })
      .then((res) => {
        socket.emit("friend-request-accepted", {
          user_id: user._id,
          friend_id: friend._id,
        });
        props.setRender(!props.render);
        setFriends((old) => [...old, res.data.friend]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // decline friend request
  const decline = async (friend) => {
    await axios
      .post(`/api/user/decline_request`, {
        user,
        friend,
      })
      .then((res) => {
        props.setRender(!props.render);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                  <User
                  accept={() => accept(friend)}
                  decline={() => decline(friend)}
                  type='friend-request'
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
