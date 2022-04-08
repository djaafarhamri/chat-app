import "./discover.css";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

const Discover = (props) => {
  const [user] = useContext(UserContext);

  return (
    <>
      <div className="discover">
        <div className="profileInfo">
          <img src={`http://localhost:4000/${user.image}`} alt="" />
          <div>
            <h4>{`${user.first_name} ${user.last_name}`}</h4>
            <h5>Personal Account</h5>
          </div>
        </div>
        <hr />
        <div className="disOptions">
          <button
            onClick={() => {
              props.setShowChangeName(true);
            }}
          >
            Change username
          </button>
          <button
            onClick={() => {
              props.setShowPicture(true);
            }}
          >
            Change profile picture
          </button>
          <button
            onClick={() => {
              props.setShowList(true);
            }}
          >
            Frriends List
          </button>
          <button
            onClick={() => {
              props.setShowFind(true);
            }}
          >
            Find Friends
          </button>
          <button
            onClick={() => {
              props.logout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Discover;
