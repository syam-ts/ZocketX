import { useEffect, useState } from "react";
import socket from "../socket/socket";
import { Link } from "react-router-dom";

function ChatList({ userId, onUserClick }: any) {
    const [onlineUsers, setOnlineUsers] = useState<[]>([]);

    useEffect(() => {
        const handleOnlineUsers = (users: any) => {
            console.log("Total users from server:", users);
            setOnlineUsers(users.filter((id: string) => id !== userId));
        };

        socket.on("online-users", handleOnlineUsers);
 
        socket.emit("get-online-users", (users: any) => { 
            console.log("Received online users via callback:", users);
            setOnlineUsers(users.filter((id: string) => id !== userId));
        });

        return () => {
            socket.off("online-users", handleOnlineUsers);
        };
    }, []);


    console.log("Complete Users: ", onlineUsers);

    return (
        <div className="w-full md:w-1/3 border-r border-gray-200 p-4 bg-white">
            <div className="flex gap-3">
                <span className="text-xl font-semibold text-gray-800">
                    Online Users : {userId}
                </span>
                <img src="online.png" className="w-5 h-5 mt-2" />
            </div>
            <div className="space-y-2">
                {onlineUsers.map((id) => (
                    <button
                        key={id}
                        onClick={() => onUserClick(id)}
                        className="w-full text-left px-4 py-2 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition shadow-sm"
                    >
                        {id}
                    </button>
                ))}
            </div>
            
            <div className='absolute bottom-0'>
                <Link to='/home'>
                  <span>Logout___</span>
                </Link>
            </div>
        </div>
    );
}

export default ChatList;
