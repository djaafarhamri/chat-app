import "./changeName.css";

const ChangeName = (props) => {
  return (
    <>
      <div
        onClick={() => {
          props.setShowChangeName(false);
        }}
        className="change-name"
      ></div>
      <div className="change-name-content">
        <h2>Change your username</h2>
        <input type="text" placeholder="username" />
        <div className="options-change-name">
          <button className="cancel">Cancel</button>
          <button className="save">Save</button>
        </div>
      </div>
    </>
  );
};

export default ChangeName;
