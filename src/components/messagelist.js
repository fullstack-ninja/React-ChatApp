import React from  'react';
import ReactDOM from 'react-dom';
import Message from './message.js';
import '../index.css';

class Messagelist extends React.Component {
    
    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this);
        node.scrollToBottom = node.scrollHeight + node.clientHeight >= node.scrollHeight;
    }

    componentDidUpdate() {
        if(this.scrollHeight) {
            const node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight;
        }
    }

    render() {
        if(!this.props.join) {
            return(
                <h1 id="joinroom">Join a Room!</h1>
            );
        }
        return(
            <div>
                {this.props.messages.map((message, index) => {
                    return(
                        <Message key={index} username={message.senderId} text={message.parts[0].payload.content} user={this.props.user} />
                    );
                })}
            </div>
        );
    }
}

export default Messagelist;