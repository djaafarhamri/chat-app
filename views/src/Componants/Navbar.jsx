import "./navbar.css";
import notification from "../assets/notification.png";
import drop_down_arrow from "../assets/drop-down-arrow.png";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/user";
import Discover from "./Discover";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChangeName from "./ChangeName";
import FindFriends from "./FindFriends";
import FriendRequests from "./FriendRequests";
import FriendsList from "./FriendsList";
import Picture from "./Picture";
import { SocketContext } from "../contexts/socket";
import { useDataSource } from "../hooks/useDataSource";
import avatar from '../assets/avatar.jpeg'

const Navbar = (props) => {
  const [user] = useContext(UserContext);
  const socket = useContext(SocketContext);

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

  // const [friendRequests, setFriendRequests] = useState([]);
  const [render, setRender] = useState(false);

  const navigate = useNavigate();

  const exit_drop = () => {
    if (props.showDropDown) {
      props.setShowDropDown(false);
    }
  };

  const friendRequests = useDataSource(
    `/api/user/get_friendRequests/${user.username}`,
    render
  ).data.friendRequests;
  useEffect(() => {
    socket.on("friend-request-received", (data) => {
      setRender(!render);
    });
    return () => {
      socket.off("friend-request-received");
    };
  }, [render, socket]);

  useEffect(() => {
    socket.on("friend-request-accepted-received", (data) => {
      setRender(!render);
    });
    return () => {
      socket.off("friend-request-received");
    };
  }, [render, socket]);


  const logout = async () => {
    await axios
      .get(`/api/user/logout`, { withCredentials: true })
      .then((res) => {
        socket.emit("logout", { user_id: user._id});
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
      {showRequests && (
        <FriendRequests
          render={render}
          setRender={setRender}
          friendRequests={friendRequests}
          setShowRequests={setShowRequests}
        />
      )}
      {showList && <FriendsList setShowList={setShowList} />}
      <div className="navbar">
        <div className="navbar-logo">
          <h2>Chat</h2>
        </div>
        <div className="navbar-user">
          <div className="navbar-notification">
            {friendRequests && friendRequests.length > 0 && (
              <div className="notification-count">
                <p>{friendRequests.length}</p>
              </div>
            )}
            <img
              src={notification}
              alt="not"
              onClick={() => {
                setShowRequests(true);
              }}
            ></img>
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
              {user?.image ? (<img src={`/${user.image}`} alt="lol" />) : (<img src={avatar} alt="lol" />)}
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
