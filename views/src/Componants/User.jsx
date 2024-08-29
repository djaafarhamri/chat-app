import { useDataSource } from "../hooks/useDataSource";
import "./user.css";
import avatar from "../assets/avatar.jpeg";
const User = (props) => {
  const image = useDataSource(
    `/api/user/get_friend_image/${props.friend.username}`
  ).data.image;

  return (
    <div className="user">
      {image ? (
        <img src={`/${image}`} alt="" />
      ) : (
        <img src={avatar} alt="" />
      )}
      <h3>{props.friend.username}</h3>
      {props.type === "user" ? <button onClick={props.add}>Add</button> : null}
      {props.type === "friend-list" ? (
        <button onClick={props.remove}>remove</button>
      ) : null}
      {props.type === "friend-request" ? (
        <div className="friend-request-buttons">
          {" "}
          <button onClick={props.accept}>accept</button>
          <button onClick={props.decline}>decline</button>
        </div>
      ) : null}
    </div>
  );
};

export default User;
