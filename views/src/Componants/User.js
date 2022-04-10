import { useDataSource } from "../hooks/useDataSource";
import "./user.css";

const User = (props) => {

 

  const image = useDataSource(
    `http://localhost:4000/get_friend_image/${props.friend.username}`
  ).data.image;

  return (
    <div className="user">
      <img src={`http://localhost:4000/${image}`} alt="" />
      <h3>{props.friend.username}</h3>
      {props.type === "user" ? <button onClick={props.add}>Add</button> : null}
      {props.type === "friend-list" ? (
        <button
          onClick={props.remove}
        >
          remove
        </button>
      ) : null}
      {props.type === "friend-request" ? (
        <div className="friend-request-buttons">
          {" "}
          <button
            onClick={props.accept}
          >
            accept
          </button>
          <button
            onClick={props.decline}
          >
            decline
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default User;
