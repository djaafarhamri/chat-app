import './navbar.css'
import notification from '../assets/notification.png'
import drop_down_arrow from '../assets/drop-down-arrow.png'
import { useContext } from 'react';
import { UserContext } from '../contexts/user';

const Navbar = () => {
    const [user] = useContext(UserContext);
    return ( 
        <div className="navbar">
            <div className="navbar-logo">
                <h2>Chat</h2>
            </div>
            
            <div className="navbar-user">
            <div className="navbar-notification">
                <img src={notification} alt='not' ></img>
            </div>
                <div className="navbar-user-img">
                    <img src={`http://localhost:4000/${user.image}`} alt=""/>
                </div>
                <div className="navbar-user-name">
                    <h4>{user.username}</h4>
                </div>
                <img src={drop_down_arrow} alt="" />
            </div>
        </div>
     );
}
 
export default Navbar;