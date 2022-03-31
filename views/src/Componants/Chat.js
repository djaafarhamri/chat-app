import "./chat.css";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // get messages
  useEffect(() => {
    axios
      .get(`http://localhost:4000/get_messages/${props.room}`)
      .then((res) => {
        setMessages(res.data.messages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.room]);
  // send message
  const sendMessage = async () => {
    await axios
      .post("http://localhost:4000/send_message", {
        room: props.room,
        sender: props.user.username,
        message: message, 
      })
      .then((res) => {
        setMessages(...messages, res.data);
        setMessage('');
      })  
      .catch((err) => {
        console.log(err);
      });
  };
  // scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, []);

  
  return (
    <div className="chat">
      <div className="messages-container">
        <div className="messages">
          {messages.map((message, index) => {
              if (index + 1 < messages.length) {
              var reSent = message.sender === messages[index + 1].sender;
              }
            return (
              <div key={index}>
                <Message reSent={reSent} message={message} />
              </div>
            );
          })}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <div className="input">
        <input type="text" placeholder="Aa" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button
          onClick={() => {
            scrollToBottom();
            sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
