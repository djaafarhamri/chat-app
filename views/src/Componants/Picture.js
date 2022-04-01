const Picture = (props) => {
  return (
    <div 
    className="change-picture"
    onClick={() => {
        props.setShowPicture(false);
      }}
    >
      <div className="change-picture-content">
        <h2>Change your profile picture</h2>
      </div>
    </div>
  );
};

export default Picture;
