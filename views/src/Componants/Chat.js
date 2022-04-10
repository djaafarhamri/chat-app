import "./chat.css";
import Message from "./Message";
import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import send from "../assets/send.png";
import { UserContext } from "../contexts/user";
import { RoomContext } from "../contexts/room";
import { SocketContext } from "../contexts/socket";
import { useDataSource } from "../hooks/useDataSource";
import { useRoom } from "../hooks/useRoom";

const Chat = (props) => {
  const [user] = useContext(UserContext);
  const [room] = useContext(RoomContext);
  const socket = useContext(SocketContext);
  const [isOnline, setIsOnline] = useState(false);
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
  const { messages, friend, setMessages } = useRoom(scrollToBottom);
  useEffect(() => {
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
  }, [room, setMessages, socket, user.username]);
  
  const friendImage = useDataSource(`http://localhost:4000/get_friend_image/${friend.username}`).data.image
  // seen
  useEffect(() => {
    socket.on("seen_server", (data) => {
      if (data.receiver !== user.username) {
        setTimeSeen(data.time);
      }
    });
    return () => {
      socket.off("seen_server");
    };
  }, [socket, user.username]);

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
  }, [room, messages]);

  useEffect(() => {
    socket.emit("get_online_friend", { username: friend.username });
    socket.on("new_online_user", () => {
      socket.emit("get_online_friend", { username: friend.username });
    });
    socket.on("online_friend", (data) => {
      if (data.username === friend.username) {
        setIsOnline(true);
      }
    });
    socket.on("offline_friend", (data) => {
      if (data.username === friend.username) {
        setIsOnline(false);
      }
    });
    
  }, [socket, friend.username]);

  return (
    <div onKeyPress={(e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    }} className={`chat ${!props.activeChat && "inactive-chat"}`}>
      {room && (
        <>
          <div className="messages-container">
            <div onClick={() => {
              props.setActiveChat(false);
              props.setActiveProfile(true);
            }} className="friend-chat-info">
                <img src={`http://localhost:4000/${friendImage}`} alt="" />
              <div className="friend-info">
                <h3>{friend.username}</h3>
                {isOnline ? (
                  <h4 className="online-status">Online</h4>
                ) : (
                  <h4 className="offline-status">Offline</h4>
                )}
              </div>
            </div>
            <div className="messages">
              {messages &&
                messages.map((msg, index) => {
                  var lastSeen;
                  if (index !== 0) {
                    var reSent = msg.sender === messages[index - 1].sender;
                  }
                  if (messages[index + 1]) {
                    lastSeen = !(
                      messages[index + 1].time < friend.last_online ||
                      messages[index + 1].time < timeSeen
                    );
                    for (let i=1; i<messages.length; i++) {
                      if (messages[index + i]) {
                        if (messages[index + i].sender === user.username) {
                          lastSeen = !(
                            messages[index + i].time < friend.last_online ||
                            messages[index + i].time < timeSeen
                          );
                          break;
                        }
                      }
                    
                      if (messages[index + 1] && !messages[index + i] && messages[index + 1].sender !== user.username) {
                        lastSeen = true;
                      }
                    }
                  } else if (!messages[index + 1]) {
                    lastSeen = true;
                  }
                  if (
                    msg.sender === user.username &&
                    (msg.time < friend.last_online || msg.time < timeSeen)
                    ) {
                    console.log('last seen 2');
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
            <img
              src={send}
              alt=""
              onClick={() => {
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
