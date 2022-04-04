import image from "../assets/avatar.jpeg";
import "./message.css";
import { useContext } from "react";
const { UserContext } = require("../contexts/user");

const Message = (props) => {
  const [user] = useContext(UserContext);
  return (
    <>
      <div className="message">
        {props.msg.sender !== user.username ? (
          <div
            className={
              props.reSent ? "message-received" : "message-received-resent"
            }
          >
            {!props.reSent && <img src={image} alt="" />}
            <h4>{props.msg.message}</h4>
          </div>
        ) : (
          <div
            className={props.reSent ? "message-sent" : "message-sent-resent"}
          >
            <h4>{props.msg.message}</h4>
            {!props.reSent && <img src={image} alt="" />}
          </div>
        )}
      </div>
      {(props.seen) && <p className="seen">seen</p>}
    </>
  );
};

export default Message;
