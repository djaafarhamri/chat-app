import './friendRequests.css';
import { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from '../contexts/user';
import axios from 'axios';
import FriendRequest from './FriendRequest';


const FriendRequests = (props) => {
    const [user] = useContext(UserContext);

    const [render, setRender] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    
    // get friend requests
    const getFriendRequests = useCallback(async () => {
        await axios
            .get(`http://localhost:4000/get_friendRequests/${user.username}`)
            .then((res) => {
                setFriendRequests(res.data.friendRequests);
                setRender(!render);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user, render]);
    useEffect(() => {
      getFriendRequests();
    
      return () => {
        // cleanup
      }
    }, [getFriendRequests, render]);
    

  return (
    <>
      <div onClick={() => {
        props.setShowRequests(false);
        }} className="friend-requests"></div>
      
      <div className="friend-requests-content">
        <h2>Friend Requests</h2>
        <div className="users">
          {friendRequests &&
            friendRequests.map((friend) => {
              return <FriendRequest render={render} setRender={setRender} friend={friend} />;
            })}
        </div>

      </div>
    </>
  );
};

export default FriendRequests;
