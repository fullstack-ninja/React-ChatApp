import React from 'react';
import '../index.css';

class Room extends React.Component {
    render() {
        const orderedRooms = [...this.props.rooms].sort();
        return(
            <div id="rooms">
                <h1 id="rooms-title">Rooms:</h1>
                <ul id="rooms-list">
                    {orderedRooms.map(room => {  
                        return(
                            //eslint-disable-next-line
                            <li key={room.id}><a onClick={() => this.props.subscribe(room.id)} href="#" id="rooms-name">{room.name}</a></li>
                        );   
                    })}
                </ul>
            </div>
        );
    }
}

export default Room;