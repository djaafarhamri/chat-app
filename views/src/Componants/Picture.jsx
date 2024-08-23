import "./picture.css";
import avatar from "../assets/avatar.jpeg";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/user";

const Picture = (props) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
    const [user] = useContext(UserContext);
  const save = () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("username", user.username);
    axios
      .post(`https://chat-app.djaafarhamri.com/api/user/change_picture`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        var img = res.data.image;
        img.split('\\').join('/');
        setImage(`https://chat-app.djaafarhamri.com/${img}`);
        props.setShowPicture(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleImageChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <div
        className="change-picture"
        onClick={() => {
          props.setShowPicture(false);
        }}
      ></div>
      <div className="change-picture-content">
        <h2>Change your profile picture</h2>
        <input type="file" onChange={handleImageChange} />
        {image ? <img src={image} alt="" /> : <img src={avatar} alt="" />}
        <button onClick={save}>save</button>
      </div>
    </>
  );
};

export default Picture;
