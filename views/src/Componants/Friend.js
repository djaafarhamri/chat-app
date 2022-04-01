import image from "../assets/avatar.jpeg";
import "./friend.css";
import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../contexts/room";
import { SocketContext } from "../contexts/socket";

const Friend = (props) => {
  const [room, setRoom] = useContext(RoomContext);
  const socket = useContext(SocketContext);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    socket.emit("get_online_friend", { username: props.friend.username });
    socket.on("new_online_user", () => {
      socket.emit("get_online_friend", { username: props.friend.username });
    });
    socket.on("online_friend", (data) => {
      if (data.username === props.friend.username) {
        setIsOnline(true);
        console.log("online : " + data.username);
      }
    });
    socket.on("offline_friend", (data) => {
      if (data.username === props.friend.username) {
        setIsOnline(false);
        console.log("offline : " + data.username);
      }
    });
  }, [socket, props.friend.username]);

  return (
    <div
      onClick={() => {
        setRoom(props.friend.room);
      }}
      className="friend"
    >
      <img src={image} alt="" />
      <h3>{props.friend.username}</h3>
    </div>
  );
};

export default Friend;
