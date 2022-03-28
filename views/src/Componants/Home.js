import Chat from './Chat';
import Discover from './Discover';
import './home.css'
import Profile from './Profile';
import { UserContext } from '../contexts/user';
import { useContext } from 'react';

const Home = () => {
    const [user, setUser] = useContext(UserContext);
    const friend = {
        avatar: 'C:/Users/EliteBooK/Desktop/projects/chat-app/uploads/avatar.jpeg',
        username: 'Felix',
        email: 'Felix@gmail.com',
    }
    return ( 
        <div className="home">
            <Profile user={user} />
            <Chat user={user} friend={friend} />
            <Discover user={user} />
        </div>
     );
}
 
export default Home;