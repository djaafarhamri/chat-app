import './chat.css';

const Chat = () => {
    return ( 
        <div className="chat">
            <div className="messages">
                
            </div>
            <div className="input">
                <input type="text" placeholder='Aa' />
                <button>Send</button>
            </div>
        </div>
     );
}
 
export default Chat;