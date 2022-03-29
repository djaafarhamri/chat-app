import "./changeName.css";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/user";

const ChangeName = (props) => {
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const save = async (e) => {
    e.preventDefault();
    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }
    await axios
      .post(
        "http://localhost:4000/change_username",
        { username, currentUsername: user.username },
        { withCredentials: true }
      )
      .then((res) => {
        setSuccess("Username changed successfully");
        setUser({ ...user, username });
        props.setShowChangeName(false);
      })
      .catch((err) => {
        setError("Username already taken");
      });
  };

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
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <div className="options-change-name">
          <button
            onClick={() => {
              props.setShowChangeName(false);
            }}
            className="cancel"
          >
            Cancel
          </button>
          <button onClick={save} className="save">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangeName;
