import "./friend.css";
import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../contexts/room";
import { SocketContext } from "../contexts/socket";
import axios from "axios";

const Friend = (props) => {
  const [room, setRoom] = useContext(RoomContext);
  const socket = useContext(SocketContext);
  const [isOnline, setIsOnline] = useState(false);
  const [image, setImage] = useState(null); 

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


  useEffect(() => {
    socket.emit("get_online_friend", { username: props.friend.username });
    socket.on("new_online_user", () => {
      socket.emit("get_online_friend", { username: props.friend.username });
    });
    socket.on("online_friend", (data) => {
      if (data.username === props.friend.username) {
        setIsOnline(true);
      }
    });
    socket.on("offline_friend", (data) => {
      if (data.username === props.friend.username) {
        setIsOnline(false);
      }
    });
    
  }, [socket, props.friend.username]);

  return (
    <div
      onClick={() => {
        setRoom(props.friend.room);
      }}
      className={`friend ${props.active === props.friend.username ? "active" : "inactive"}`}
    >
      <div className="friend-image">
        <img src={`http://localhost:4000/${image}`} alt="" />
      </div>
      <div className="friend-info">
        <h3>{props.friend.username}</h3>
        { isOnline ? <h4 className="online-status">Online</h4> : <h4 className="offline-status">Offline</h4> }
      </div>
    </div>
  );
};

export default Friend;
