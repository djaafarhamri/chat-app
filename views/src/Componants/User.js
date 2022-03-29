import axios from 'axios';
import image from '../assets/avatar.jpeg';
import './user.css';


const User = (props) => {
    // send request
    const add = async () => {
        console.log('add');
        await axios.post('http://localhost:4000/send_request', {
            user: props.user,
            friend: props.friend
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    return ( 
        <div className="user">
            <img src={image} alt="" />
            <h3>{props.friend.username}</h3>
            <button onClick={add}>Add</button>
        </div>
     );
}
 
export default User;