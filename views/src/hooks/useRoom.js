import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/user";
import { RoomContext } from "../contexts/room";
import { SocketContext } from "../contexts/socket";

export const useRoom = () => {
  const socket = useContext(SocketContext);
  const [user] = useContext(UserContext);
  const [room] = useContext(RoomContext);
  const [messages, setMessages] = useState([]);
  const [friend, setFriend] = useState("");
  useEffect(() => {
    if (room) {
      socket.emit("join", {
        room,
      });
      socket.emit("seen_user", {
        receiver: user.username,
        room,
        time: Date.now(),
      });
      axios
        .get(`/api/chat/get_messages/${room}`)
        .then((res) => {
          setMessages(res.data.messages);
          setFriend(() => {
            return res.data.users.filter(
              (us) => us.username !== user.username
            )[0];
          });
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .post(`/api/chat/update_last_online`, {
          room,
          username: user.username,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    return () => {
      socket.emit("leave", {
        room,
      });
    };
  }, [room, socket, user.username]);
  
  return { messages, friend, setMessages };
};
