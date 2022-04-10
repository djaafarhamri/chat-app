import axios from "axios";
import { useContext } from "react";
import "./friendList.css";
import { UserContext } from "../contexts/user";
import { FriendContext } from "../contexts/friends";
import { useDataSource } from "../hooks/useDataSource";

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
  
  const image = useDataSource(`http://localhost:4000/get_friend_image/${props.friend.username}`).data.image


  return (
    <div className="friend-list">
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img src={`http://localhost:4000/${image}`} alt="" />
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
