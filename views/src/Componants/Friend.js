import image from '../assets/avatar.jpeg';
import './friend.css';

const Friend = (props) => {
    console.log("props: ",props);
    return ( 
        <div className="friend">
            <img src={image} alt="" />
            <h3>{props.friend.username}</h3>
        </div>
     );
}
 
export default Friend;