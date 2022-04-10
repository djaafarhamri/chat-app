import "./friendRequests.css";
import User from "./User";

const FriendRequests = (props) => {

  return (
    <>
      <div
        onClick={() => {
          props.setShowRequests(false);
        }}
        className="friend-requests"
      ></div>

      <div className="friend-requests-content">
        <h2>Friend Requests</h2>
        <div className="users">
          {props.friendRequests &&
            props.friendRequests.map((friend, index) => {
              return (
                <div key={index}>
                  <User
                  type='friend-request'
                    render={props.render}
                    setRender={props.setRender}
                    friend={friend}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default FriendRequests;
