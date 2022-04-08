import "./changeName.css";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/user";

const ChangeName = (props) => {
  const [user, setUser] = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.first_name);
  const [username, setUsername] = useState(user.username);
  const [lastName, setLastName] = useState(user.last_name);
  const [editUsername, setEditUsername] = useState(false);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
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
        {
          username,
          currentUsername: user.username,
          firstName,
          lastName,
          editFirstName,
          editLastName,
          editUsername,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setSuccess("Username changed successfully");
        setUser({ ...user, username, first_name: firstName, last_name: lastName });
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
        <h2>Change your info</h2>
        <div style={{ display: "flex", width: '100%' }}>
          {editUsername ? (
            <input
              type="text"
              placeholder="New username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
              ) : (
                <p>{user.username}</p>
                )}
          <button
            onClick={() => {
              setEditUsername(true);
            }}
            >
            edit
          </button>
        </div>

        <div style={{ display: "flex", width: '100%' }}>
          {editFirstName ? (
            <input
            type="text"
            placeholder="New first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
          ) : (
            <p>{user.first_name}</p>
            )}
          <button
            onClick={() => {
              setEditFirstName(true);
            }}
            >
            edit
          </button>
        </div>

        <div style={{ display: "flex", width: '100%' }}>
          {editLastName ? (
            <input
            type="text"
            placeholder="New last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />
          ) : (
            <p>{user.last_name}</p>
          )}
          <button
            onClick={() => {
              setEditLastName(true);
            }}
          >
            edit
          </button>
        </div>

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
