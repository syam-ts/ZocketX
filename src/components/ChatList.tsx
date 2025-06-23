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
        <div className="w-1/3 border-r p-4">
            <h2 className="text-xl font-bold">Online Users</h2>
            {onlineUsers.map((id) => (
                <div>
                    <button
                        key={id}
                        onClick={onUserClick(id)}
                        className="block p-2 mt-2 bg-blue-100 rounded"
                    >
                        {id}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ChatList;
