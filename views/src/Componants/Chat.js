import "./chat.css";
import Message from "./Message";
import { useEffect, useRef } from "react";

const Chat = () => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const messages = [
    {
      text: "Hello 3",
      type: "sent 3",
    },
    {
      text: "Hey",
      type: "received",
    },
    {
      text: "Hello",
      type: "sent",
    },
    {
      text: "Hey",
      type: "received",
    },
    {
      text: "Hello",
      type: "sent",
    },
    {
      text: "Hey",
      type: "received",
    },
    {
      text: "Hello",
      type: "sent",
    },
    {
      text: "Hey",
      type: "received",
    },
    {
      text: "Hello",
      type: "sent",
    },
    {
      text: "Hey",
      type: "received",
    },
    {
      text: "Hello",
      type: "sent",
    },
    {
      text: "Hey",
      type: "received",
    },
    {
      text: "Hello",
      type: "sent",
    },
    {
      text: "Hey",
      type: "received",
    },
    {
      text: "Hello",
      type: "sent",
    },
    {
      text: "Hey",
      type: "received",
    },
    {
      text: "Hello",
      type: "sent",
    },
    {
      text: "Hey",
      type: "received",
    },
    {
      text: "Hello 2",
      type: "sent",
    },
    {
      text: "Hey 2",
      type: "received",
    },
  ];
  return (
    <div className="chat">
      <div className="messages-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index}>
              <Message message={message} />
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <div className="input">
        <input type="text" placeholder="Aa" />
        <button
          onClick={() => {
            scrollToBottom();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
