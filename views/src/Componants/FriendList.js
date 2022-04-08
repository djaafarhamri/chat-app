import axios from "axios";
import image from "../assets/avatar.jpeg";
import { useContext } from "react";
import "./friendList.css";
import { UserContext } from "../contexts/user";
import { FriendContext } from "../contexts/friends";

const FriendList = (props) => {
  const [ friends, setFriends ] = useContext(FriendContext);
  const [user] = useContext(UserContext);
  const remove = async (friend) => {
    await axios
      .post(`http://localhost:4000/delete_friend`, {
        user,
        friend: props.friend,
      })
      .then((res) => {
        props.setRender(!props.render);
        setFriends(old => [...old.filter(f => f.username !== friend.username)]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="friend-list">
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img src={image} alt="" />
        <h3>{props.friend.username}</h3>
      </div>
      <button
        onClick={() => {
          remove(props.friend);
        }}
      >
        remove
      </button>
    </div>
  );
};

export default FriendList;
