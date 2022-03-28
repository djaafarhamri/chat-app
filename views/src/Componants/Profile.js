import "./profile.css";
import Friend from "./Friend";

const Profile = (props) => {
 
  const friends = [
    {
      avatar:
        "C:/Users/EliteBooK/Desktop/projects/chat-app/uploads/avatar.jpeg",
      username: "John",
      email: "john@gmail.com",
    },
    {
      avatar:
        "C:/Users/EliteBooK/Desktop/projects/chat-app/uploads/avatar.jpeg",
      username: "Felix",
      email: "john@gmail.com",
    },
    {
      avatar:
        "C:/Users/EliteBooK/Desktop/projects/chat-app/uploads/avatar.jpeg",
      username: "Marzia",
      email: "john@gmail.com",
    },
  ];

  return (
    <div className="profile">
      
      <div className="chats">
        <h1>Chats</h1>
        <input type="text" placeholder="Search Friends" />
        {friends &&
          friends.map((friend, id) => (
            <div style={{width: '100%'}} key={id}>
              <Friend friend={friend} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
