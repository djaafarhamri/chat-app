import image from '../assets/avatar.jpeg';
import './friend.css';
import { useContext } from 'react';
import { RoomContext } from '../contexts/room';

const Friend = (props) => {
    const [room, setRoom] = useContext(RoomContext);
    return ( 
        <div onClick={() => {setRoom(props.friend.room)}} className="friend">
            <img src={image} alt="" />
            <h3>{props.friend.username}</h3>
        </div>
     );
}
 
export default Friend;