import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import socket from '../socket/socket';

function ChatBox({ userId, selectedUser}: any) {

 const [messages, setMessages] = useState<any[]>([]);
 const [text, setText] = useState<''>('');
 const messagesEndRef = useRef(null);
 


 useEffect(() => {
     const fetchMessages = async(): Promise<void> => {
        try { 

       interface Response {
        messages: string[];
       }

        const response: Response = await axios.post('http://localhost:3000/message/get-messages', {
             from: userId,
             to: selectedUser
         });
         console.log('Response; ',response)
         setMessages(response.messages);
    } catch (error) {
    console.log('ERROR: ',error);
   }
 };

fetchMessages();
 }, [selectedUser]);

 useEffect(() => {
   const handleReceive = (message: any) => {
    if(message.from === selectedUser) {
        setMessages((prev) => [...prev, {...message, from: selectedUser}]);
    }
   };
 socket.on('message-received', handleReceive);
   return () => {
      socket.off('message-received', handleReceive);
   }
 }, [selectedUser]);


 const sendMessage = async() => {
    if(!text.trim()) return;

    const newMessage = {
        from : userId,
        to: selectedUser, 
        message: text
    };
 
    socket.emit('send-message', newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setText('');
 }


  return (
  <div className="w-2/3 p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 my-1 rounded ${
              msg.from === userId ? 'bg-green-100 self-end' : 'bg-gray-200 self-start'
            }`}
          >
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex mt-2">
        <input
          className="flex-1 border p-2 rounded"
          value={text}
          onChange={(e: any) => setText(e.target.value)}
        />
        <button className="ml-2 px-4 bg-blue-500 text-white rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatBox