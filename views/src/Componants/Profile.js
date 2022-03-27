import "./profile.css";
import image from "../assets/avatar.jpeg";
const Profile = (props) => {
  return (
    <div className="profile">
      <div className="profile-info">
        {/* <img src={props.user.avatar} alt="" /> */}
        <img src={image} alt="" />
        <h3>{props.user.username}</h3>
      </div>
      <div className="chats">
        <h2>Chats</h2>
        <input type="text" placeholder='Search Friends' />
      </div>
    </div>
  );
};

export default Profile;
