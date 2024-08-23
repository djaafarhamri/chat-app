import "./message.css";
import { useContext } from "react";
import { UserContext } from "../contexts/user";
import avatar from "../assets/avatar.jpeg";

const Message = (props) => {
  const [user] = useContext(UserContext);
  return (
    <>
      <div className="message">
        {props.msg.sender !== user.username ? (
          <div className="message-received">
            {!props.reSent ? (
              props.friendImage ? (
                <img
                  src={`https://chat-app.djaafarhamri.com/${props.friendImage}`}
                  alt="lol"
                />
              ) : (
                <img src={avatar} alt="lol" />
              )
            ) : (
              <div
                style={{ height: "40px", width: "40px", margin: "0 5px" }}
              ></div>
            )}
            <h4>{props.msg.message}</h4>
          </div>
        ) : (
          <div className="message-sent">
            <h4>{props.msg.message}</h4>
            {!props.reSent ? (
              user?.image ? (
                <img src={`https://chat-app.djaafarhamri.com/${user.image}`} alt="lol" />
              ) : (
                <img src={avatar} alt="lol" />
              )
            ) : (
              <div
                style={{ height: "40px", width: "40px", margin: "0 5px" }}
              ></div>
            )}
          </div>
        )}
      </div>
      {/* {(props.seen) && <p className="seen">seen</p>} */}
      {props.lastSeen && (
        <div className="seen">
          {props.friendImage ? (
            <img
              className="seenImg"
              src={`https://chat-app.djaafarhamri.com/${props.friendImage}`}
              alt=""
            />
          ) : (
            <img className="seenImg" src={avatar} alt="" />
          )}
        </div>
      )}
    </>
  );
};

export default Message;
