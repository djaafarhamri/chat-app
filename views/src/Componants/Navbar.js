import "./navbar.css";
import notification from "../assets/notification.png";
import drop_down_arrow from "../assets/drop-down-arrow.png";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/user";
import Discover from "./Discover";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChangeName from "./ChangeName";
import FindFriends from "./FindFriends";
import FriendRequests from "./FriendRequests";
import FriendsList from "./FriendsList";
import Picture from "./Picture";

const Navbar = (props) => {
    const [user] = useContext(UserContext);
    //setShowChangeName
    const [showChangeName, setShowChangeName] = useState(false);
    //setShowPicture
    const [showPicture, setShowPicture] = useState(false);
    //showfind
    const [showFind, setShowFind] = useState(false);
  //show requests
  const [showRequests, setShowRequests] = useState(false);
  //show friends list
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate();
  
  const exit_drop = () => {
    if (props.showDropDown) {
        props.setShowDropDown(false);
    }
}

  const logout = async () => {
    await axios
      .get("http://localhost:4000/logout", { withCredentials: true })
      .then((res) => {
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div onClick={exit_drop} className="nav">
      {showChangeName && <ChangeName setShowChangeName={setShowChangeName} />}
      {showPicture && <Picture setShowPicture={setShowPicture} />}
      {showFind && <FindFriends setShowFind={setShowFind} />}
      {showRequests && <FriendRequests setShowRequests={setShowRequests} />}
      {showList && <FriendsList setShowList={setShowList} />}
      <div className="navbar">
        <div className="navbar-logo">
          <h2>Chat</h2>
        </div>
        <div className="navbar-user">
          <div className="navbar-notification">
            <img src={notification} alt="not" onClick={() => {setShowRequests(true)}}></img>
          </div>
          <div
            onClick={() => {
              props.setShowDropDown(!props.showDropDown);
            }}
            className="navbar-user-info"
          >
            {props.showDropDown && (
              <Discover
                setShowChangeName={setShowChangeName}
                setShowPicture={setShowPicture}
                setShowFind={setShowFind}
                setShowList={setShowList}
                logout={logout}
              />
            )}

            <div className="navbar-user-img">
              <img src={`http://localhost:4000/${user.image}`} alt="" />
            </div>
            <div className="navbar-user-name">
              <h4>{user.username}</h4>
            </div>
            <img src={drop_down_arrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
