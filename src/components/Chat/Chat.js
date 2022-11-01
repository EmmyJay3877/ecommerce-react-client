import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Swal from 'sweetalert';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
 
  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io('wss://fastapi-chatapp-st.onrender.com', {
      path: '/ws/socket.io'
    });
    setRoom(room);
    setName(name);
    socket.emit('join', name, room, (error)=>{
      if(error){
        const myTimeout = setTimeout(changeLoc, 2000);
        return [Swal({
          title: "Opps..",
          text: "Username already exist",
          icon: "error"
        }), myTimeout]
      }
    });

    return () => {
      socket.emit('disconnect');
    }
  }, []);

  const changeLoc = () => window.location.assign('http://127.0.0.1:3000')
  
  useEffect(() => {

    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
      console.log(messages)
    });
    
    socket.on("roomdata", ( {users} ) => {
      setUsers(users);
      console.log(users)
    });
}, []);


  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('send_msg', message, () => setMessage(''));
    }
  }

  return (
     <div className="outerContainer">
        <div className="container">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        <TextContainer users={users}/>
      </div>
  );
}

export default Chat;
