import React from 'react';
import '../index.css';

export class Sendmessage extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        this.setState({
            message: ev.target.value
        })
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
          });
    }
    
    render() {
        return(
            <form onSubmit={this.handleSubmit} id="sendMessage">
                <input onChange={this.handleChange} value={this.state.message} disabled={this.props.disabled} placeholder="Enter your message here" id="sendmessage-input" />
            </form>
        );
    }
}