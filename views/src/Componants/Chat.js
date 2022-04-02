import "./chat.css";
import Message from "./Message";
import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/user";
import { RoomContext } from "../contexts/room";
import { SocketContext } from "../contexts/socket";

const Chat = () => {
  const [user] = useContext(UserContext);
  const [room] = useContext(RoomContext);
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
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
    console.log("useEffect");
    socket.on("receiveMessage", (data) => {
      setMessages([
        ...messages,
        { message: data.message, sender: data.sender },
      ]);
      scrollToBottom();
    });
  });
  
  // get messages
  useEffect(() => {
    if (room) {
      socket.emit("join", {
        room,
      });
      axios
      .get(`http://localhost:4000/get_messages/${room}`)
      .then((res) => {
        setMessages(res.data.messages);
        scrollToBottom();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [room, socket]);
  // send message
  const sendMessage = async () => {
    scrollToBottom();
    if (message) {
      socket.emit("sendMessage", {
        room,
        sender: user.username,
        message,
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
                  if (index + 1 < messages.length) {
                    var reSent = msg.sender === messages[index + 1].sender;
                  }
                  return (
                    <div key={index}>
                      <Message reSent={reSent} msg={msg} />
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
            <button
              onClick={() => {
                sendMessage();
                scrollToBottom();
              }}
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
