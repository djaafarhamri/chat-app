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
      type: "sent",
    },
    {
      text: "Heyweuncweicmweicmwiec wi cwiencwiej cw cuiq cqwi cqhw ciqw cqiw cqw qwic qwc ",
      type: "received",
    },
    {
      text: "Hello",
      type: "received",
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
      type: "sent",
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
          {messages.map((message, index) => {
              if (index + 1 < messages.length) {
              var reSent = message.type === messages[index + 1].type;
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
