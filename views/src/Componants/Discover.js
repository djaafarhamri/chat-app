import "./discover.css";


const Discover = (props) => {

  return (
    <>
      
      <div className="discover">
        <div className="options">
          <button
            onClick={() => {
              props.setShowChangeName(true);
            }}
          >
            Change username
          </button>
          <button
            onClick={() => {
              props.setShowPicture(true);
            }}
          >
            Change profile picture
          </button>
          <button
            onClick={() => {
              props.setShowList(true);
            }}
          >
            Frriends List
          </button>
          <button
            onClick={() => {
              props.setShowFind(true);
            }}
          >
            Find Friends
          </button>
          <button onClick={() => {props.logout()}}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Discover;
