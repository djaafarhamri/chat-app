import image from '../assets/avatar.jpeg';
import './message.css'

const Message = (props) => {
    return ( 
        <div className="message">
            <img src={image} alt="" />
            <h4>{props.message.text}</h4>
        </div>
     );
}
 
export default Message;