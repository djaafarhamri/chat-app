import axios from 'axios';
import { useDataSource } from '../hooks/useDataSource';
import './user.css';


const User = (props) => {
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
    const image = useDataSource(`http://localhost:4000/get_friend_image/${props.friend.username}`).data.image

    
    return ( 
        <div className="user">
            <img src={`http://localhost:4000/${image}`} alt="" />
            <h3>{props.friend.username}</h3>
            <button onClick={add}>Add</button>
        </div>
     );
}
 
export default User;