import axios from 'axios';
import { useState, useEffect } from 'react';
import './user.css';


const User = (props) => {
    const [image, setImage] = useState();
    // send request
    const add = async () => {
        await axios.post('http://localhost:4000/send_request', {
            user: props.user,
            friend: props.friend
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {
        axios
          .get(`http://localhost:4000/get_friend_image/${props.friend.username}`)
          .then((res) => {
            setImage(res.data.image);
          })
          .catch((err) => {
            console.log(err);
          });
          return () => {
            //
          }
      }, [props.friend.username]);
    
    
    return ( 
        <div className="user">
            <img src={`http://localhost:4000/${image}`} alt="" />
            <h3>{props.friend.username}</h3>
            <button onClick={add}>Add</button>
        </div>
     );
}
 
export default User;