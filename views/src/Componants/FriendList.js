import axios from "axios";
import image from "../assets/avatar.jpeg";
import { useContext } from "react";
import "./friendList.css";
import { UserContext } from "../contexts/user";

const FriendList = (props) => {
  const [user] = useContext(UserContext);
  const remove = async (friend) => {
    await axios
      .post(`http://localhost:4000/delete_friend`, {
        user,
        friend: props.friend,
      })
      .then((res) => {
        props.setRender(!props.render);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("delete render: ", props.render);
  };
  return (
    <div className="friend-list">
      <img src={image} alt="" />
      <h3>{props.friend.username}</h3>
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
