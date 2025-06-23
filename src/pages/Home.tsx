import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [input, setInput] = useState(" ");
    const navigate = useNavigate();
    const inputRef = useRef<any>(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const sendUserId = (userId: string) => {
        socket.emit("add-user", userId);

        navigate(`/chatcontainer?userId=${userId}`);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Enter Your User ID
                </h2>

                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 placeholder:text-gray-400"
                        placeholder="Type your user ID..."
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <button
                        onClick={() => sendUserId(input)}
                        type="button"
                        className="bg-slate-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-700 transition shadow hover:shadow-md focus:outline-none"
                    >
                        Enter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
