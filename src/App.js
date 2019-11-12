import React from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Messagelist from './components/messagelist.js';
import Room from './components/room.js';
import { Newroom } from './components/newroom.js';
import { Sendmessage } from './components/sendmessage.js';
import './index.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      rooms: [],
      joinedRooms: [],
      roomId: null
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }
  
  componentDidMount() {
    const tokenProvider = new TokenProvider({
      url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/09e6bf6d-db64-47a1-92fe-911e2fd6287b/token"
    });

    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:09e6bf6d-db64-47a1-92fe-911e2fd6287b",
      userId: "michael",
      tokenProvider: tokenProvider
    });
    
    chatManager
    .connect()
    .then(currentUser=>{
      this.currentUser = currentUser;
      this.getRooms();
    })
    .catch(error=>{
      console.log("error: ", error);
    })
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(rooms => {
        this.setState({
          rooms,
          joinedRooms: this.currentUser.rooms
        });
        
      })
      .catch(err => { 
        console.log("cannot fetch", err);
      })
  }

  subscribeToRoom(roomId) {
    this.setState({
      messages: []
    });
    this.currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          console.log(message);
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
    .then(room => {
      this.setState({
        roomId: room.id
      })
      this.getRooms();
    })
    .catch(err => {console.log('error:', err);})
  }

  sendMessage(text) {
    this.currentUser.sendSimpleMessage({
      text,
      roomId: this.state.roomId
    })
  }

  createRoom(roomname) {
    this.currentUser.createRoom({
      id: roomname,
      name: roomname,
      private: false,
      addUSerIds: [this.userId],
    })
    .then(room => {
      console.log(`room created: ${room.name}`);
    })
    .catch(err => {
      console.log(`cannot create a room: ${err}`);
    })
  }

  render() {
    return (
      <div className="app">
        <div className="room">
          <Room rooms={[...this.state.rooms, ...this.state.joinedRooms]} subscribe={this.subscribeToRoom} />
        </div>
        <div className="messagelist">
          <Messagelist messages={this.state.messages} join={this.state.roomId} />
        </div>
        <div className="messagelist">
          <Messagelist messages={this.state.messages} join={this.state.roomId} user={this.currentUser} />
        </div>
        <div className="newroom">
          <Newroom createRoom={this.createRoom} />  
        </div>
        <div className="sendmessage">
          <Sendmessage sendMessage={this.sendMessage} disabled={!this.state.roomId} />
        </div>
      </div>
    );
  }
}

export default App;