import Chat from './Chat';
import Discover from './Discover';
import './home.css'
import Profile from './Profile';

const Home = () => {
    return ( 
        <div className="home">
            <Profile />
            <Chat />
            <Discover />
        </div>
     );
}
 
export default Home;