import "./friendRequests.css";
import FriendRequest from "./FriendRequest";

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
                  <FriendRequest
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
