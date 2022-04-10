import "./friendRequests.css";
import User from "./User";
import axios from "axios";
import { UserContext } from "../contexts/user";
import { FriendContext } from "../contexts/friends";
import { useContext } from "react";

const FriendRequests = (props) => {
  const [user] = useContext(UserContext);
  const [friends, setFriends] = useContext(FriendContext);
  // accept request
  const accept = async (friend) => {
    await axios
      .post(`http://localhost:4000/accept_request`, {
        user,
        friend,
      })
      .then((res) => {
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
      .post(`http://localhost:4000/decline_request`, {
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
