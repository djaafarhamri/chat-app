import "./chat.css";
import Message from "./Message";
import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import send from "../assets/send.png";
import { UserContext } from "../contexts/user";
import { RoomContext } from "../contexts/room";
import { SocketContext } from "../contexts/socket";

const Chat = () => {
  const [user] = useContext(UserContext);
  const [room] = useContext(RoomContext);
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [friend, setFriend] = useState("");
  const [friendImage, setFriendImage] = useState("");
  const [timeSeen, setTimeSeen] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // online user
  useEffect(() => {
    socket.emit("online_user", { username: user.username });
  }, [socket, user.username]);

  // receive message from server
  useEffect(() => {
    console.log("receiveMessage");
    socket.on("receiveMessage", (data) => {
      setMessages((old) => [
        ...old,
        { message: data.message, sender: data.sender, time: data.time },
      ]);
      socket.emit("seen_user", {
        sender: data.sender,
        receiver: user.username,
        room,
        time: Date.now(),
      });
      scrollToBottom();
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [room, socket, user.username]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/get_friend_image/${friend.username}`)
      .then((res) => {
        setFriendImage(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      //
    };
  }, [friend.username]);

  // seen
  useEffect(() => {
    socket.on("seen_server", (data) => {
      if (data.receiver !== user.username) {
        console.log("seen", data);
        setTimeSeen(data.time);
      }
    });
    return () => {
      socket.off("seen_server");
    };
  }, [socket, user.username]);
  // get messages
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
        .get(`http://localhost:4000/get_messages/${room}`)
        .then((res) => {
          setMessages(res.data.messages);
          setFriend(() => {
            return res.data.users.filter(
              (us) => us.username !== user.username
            )[0];
          });
          scrollToBottom();
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .post(`http://localhost:4000/update_last_online`, {
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
  // send message
  const sendMessage = async () => {
    scrollToBottom();
    if (message) {
      socket.emit("sendMessage", {
        room,
        sender: user.username,
        message,
        time: Date.now(),
      });
    }
    await axios
      .post("http://localhost:4000/send_message", {
        room,
        sender: user.username,
        message,
      })
      .then((res) => {
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [room]);

  return (
    <div className="chat">
      {room && (
        <>
          <div className="messages-container">
            <div className="messages">
              {messages &&
                messages.map((msg, index) => {
                  if (index !== 0) {
                    var reSent = msg.sender === messages[index - 1].sender;
                  }
                  if (messages[index + 1]) {
                    var lastSeen = !(
                      messages[index + 1].time < friend.last_online ||
                      messages[index + 1].time < timeSeen
                    );
                    console.log(`lastSeen ${index} : ${lastSeen}`);
                  } else if (!messages[index + 1]) {
                    lastSeen = true;
                  }
                  if (
                    msg.sender === user.username &&
                    (msg.time < friend.last_online || msg.time < timeSeen)
                  ) {
                    return (
                      <div key={index}>
                        <Message
                          friendImage={friendImage}
                          msg={msg}
                          reSent={reSent}
                          seen={true}
                          lastSeen={lastSeen}
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={index}>
                      <Message
                        friendImage={friendImage}
                        reSent={reSent}
                        msg={msg}
                        seen={false}
                        lastSeen={false}
                      />
                    </div>
                  );
                })}
            </div>
            <div ref={messagesEndRef} />
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Aa"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <img src={send} alt="" 
            onClick=
            {() => {
              sendMessage();
              scrollToBottom();
            }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
