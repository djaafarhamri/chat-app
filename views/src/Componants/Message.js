import "./message.css";
import { useContext } from "react";
const { UserContext } = require("../contexts/user");

const Message = (props) => {
  const [user] = useContext(UserContext);
  console.log('last seen', props.lastSeen);
  return (
    <>
      <div className="message">
        {props.msg.sender !== user.username ? (
          <div className="message-received">
            {!props.reSent ? (
              <img src={`http://localhost:4000/${props.friendImage}`} alt="" />
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
              <img src={`http://localhost:4000/${user.image}`} alt="" />
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
          <img
            className="seenImg"
            src={`http://localhost:4000/${props.friendImage}`}
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Message;
