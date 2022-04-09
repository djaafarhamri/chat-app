import axios from "axios";
import image from "../assets/avatar.jpeg";
import { useContext, useState, useEffect } from "react";
import "./friendRequest.css";
import { UserContext } from "../contexts/user";
import { FriendContext } from "../contexts/friends";

const FriendRequest = (props) => {
  const [user] = useContext(UserContext);
  const [friends, setFriends] = useContext(FriendContext);
  const [ image, setImage ] = useState();
  // accept friend request
  const accept = async (friend) => {
    await axios
    .post(`http://localhost:4000/accept_request`, {
      user,
        friend,
      })
      .then((res) => {
        props.setRender(!props.render);
        setFriends(old => [...old, res.data.friend]);
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
  useEffect(() => {
    axios
      .get(`http://localhost:4000/get_friend_image/${props.friend.username}`)
      .then((res) => {
        setImage(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
      return () => {
        //
      }
  }, [props.friend.username]);



  return (
    <div className="friend-request">
      <img src={`http://localhost:4000/${image}`} alt="" />
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
