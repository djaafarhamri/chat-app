import image from "../assets/avatar.jpeg";
import "./message.css";

const Message = (props) => {
    // console.log(props);
  return (
    <div className="message">
      {props.message.type === "received" ? (
        <div className={props.reSent ? "message-received":"message-received-resent"}>
          {!props.reSent && <img src={image} alt="" />}
          <h4>{props.message.text}</h4>
        </div>
      ) : (
        <div className={props.reSent ? "message-sent":"message-sent-resent"}>
          <h4>{props.message.text}</h4>
          {!props.reSent && <img src={image} alt="" />}
        </div>
      )}
    </div>
  );
};

export default Message;
