import React from 'react';
import '../index.css';

function Message(props) {
    if (props.user === props.username) {
        document.getElementById("message").style.textAlign = "right";
    }
    return(
        <div id="message">
            <p id="message-sender">{props.username}</p>
            <p id="message-content">{props.text}</p>
        </div>
    );
}

export default Message;