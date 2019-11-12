import React from 'react';

export class Newroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newroom: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.formSubmit =this.formSubmit.bind(this);
    }

    handleChange(ev) {
        this.setState({
            newroom: ev.target.value
        });
    }

    formSubmit(ev) {
        ev.preventDefault();
        this.props.createRoom(this.state.newroom);
        this.setState({
            newroom: ''
        })
    }

    render() {
        return(
            <form onSubmit={this.formSubmit} class="newRoom">
                <input onChange={this.handleChange} value={this.state.newroom} placeholder="enter your room name" id="newroom-input" />
            </form>
        );
    }
}