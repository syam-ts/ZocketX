import { useState } from 'react'
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import { useLocation } from 'react-router-dom';


const ChatContainer = () => {

   const location = useLocation();

  
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  alert(userId)

const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className='flex h-screen'>
      <ChatList userId={userId} onUserClick={setSelectedUser} />
      {
        selectedUser && (
            <ChatBox userId={userId} selectedUser={selectedUser} />
        )
      }
    </div>
  )
}

export default ChatContainer