import axios from "axios";
import image from "../assets/avatar.jpeg";
import { useContext } from "react";
import "./friendRequest.css";
import { UserContext } from "../contexts/user";

const FriendRequest = (props) => {
  const [user, setUser] = useContext(UserContext);
  // accept friend request
  const accept = async (friend) => {
    await axios
      .post(`http://localhost:4000/accept_request`, {
        username: user.username,
        friend: friend.username,
      })
      .then((res) => {
        props.setRender(!props.render);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // decline friend request
  const decline = async (friend) => {
    await axios
      .post(`http://localhost:4000/decline_request`, {
        username: user.username,
        friend: friend.username,
      })
      .then((res) => {
        props.setRender(!props.render);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="friend-request">
      <img src={image} alt="" />
      <h3>{props.friend.username}</h3>
      <button
        onClick={() => {
          accept(props.friend);
        }}
      >
        accept
      </button>
      <button
        onClick={() => {
          decline(props.friend);
        }}
      >
        decline
      </button>
    </div>
  );
};

export default FriendRequest;
