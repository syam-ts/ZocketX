import { useEffect, useState } from "react";
import socket from "../socket/socket";

function ChatList({ userId, onUserClick }: any) {
    const [onlineUsers, setOnlineUsers] = useState<[]>([]);

    useEffect(() => {
        try {
            socket.on("online-users", (users) => {
                setOnlineUsers(users.filter((id: string) => id !== userId));
            });

            return () => {
                socket.off("online-users");
            };
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }, []);

    return (
        <div className="w-full md:w-1/3 border-r border-gray-200 p-4 bg-white">
            <div className="flex gap-3">
                <span className="text-xl font-semibold text-gray-800">
                Online Users : {userId}
            </span>
                <img src='online.png' className='w-5 h-5 mt-2' />
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
        </div>
    );
}

export default ChatList;
