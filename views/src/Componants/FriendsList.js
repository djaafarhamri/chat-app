import "./friendsList.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/user";
import axios from "axios";
import FriendList from "./FriendList";

const FriendsList = (props) => {
  const [user] = useContext(UserContext);

  const [render, setRender] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios
    .get(`http://localhost:4000/get_friends/${user.username}`)
    .then((res) => {
      setFriends(res.data.friends);
    })
    .catch((err) => {
      console.log(err);
    });
    
    return () => {
      // cleanup
    };
  }, [user.username, render]);

  return (
    <>
      <div
        onClick={() => {
          props.setShowList(false);
        }}
        className="friends-list"
      ></div>

      <div className="friends-list-content">
        <h2>Friend list</h2>
        <div className="friends-list-users">
          {friends &&
            friends.map((friend, index) => {
              return (
                <div key={index}>
                  <FriendList
                    render={render}
                    setRender={setRender}
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

export default FriendsList;
