import "./picture.css";
import avatar from "../assets/avatar.jpeg";
import { useState } from "react";
import axios from "axios";

const Picture = (props) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
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
        <button>save</button>
      </div>
    </>
  );
};

export default Picture;
