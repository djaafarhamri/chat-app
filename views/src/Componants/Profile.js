import "./profile.css";
import Friend from "./Friend";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../contexts/user';

const Profile = (props) => {
  const [user] = useContext(UserContext);
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
        //
      }
  }, [user.username]);

 
  return (
    <div className="profile">
      
      <div className="chats">
        <h1>Chats</h1>
        <input type="text" placeholder="Search Friends" />
        {friends &&
          friends.map((friend, id) => (
            <div style={{width: '100%'}} key={id}>
              <Friend friend={friend} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
