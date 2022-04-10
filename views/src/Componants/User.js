import axios from "axios";
import { useDataSource } from "../hooks/useDataSource";
import { UserContext } from "../contexts/user";
import { FriendContext } from "../contexts/friends";
import { useContext } from "react";
import "./user.css";

const User = (props) => {
  const [user] = useContext(UserContext);
  const [friends, setFriends] = useContext(FriendContext);
  // send request
  const add = async () => {
    await axios
      .post("http://localhost:4000/send_request", {
        user: props.user,
        friend: props.friend,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  const remove = async (friend) => {
    await axios
      .post(`http://localhost:4000/delete_friend`, {
        user,
        friend: props.friend,
      })
      .then((res) => {
        props.setRender(!props.render);
        setFriends((old) => [
          ...old.filter((f) => f.username !== friend.username),
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const image = useDataSource(
    `http://localhost:4000/get_friend_image/${props.friend.username}`
  ).data.image;

  return (
    <div className="user">
      <img src={`http://localhost:4000/${image}`} alt="" />
      <h3>{props.friend.username}</h3>
      {props.type === "user" ? <button onClick={add}>Add</button> : null}
      {props.type === "friend-list" ? (
        <button
          onClick={() => {
            remove(props.friend);
          }}
        >
          remove
        </button>
      ) : null}
      {props.type === "friend-request" ? (
        <>
          {" "}
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
        </>
      ) : null}
    </div>
  );
};

export default User;
