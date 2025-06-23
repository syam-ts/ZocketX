import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [input, setInput] = useState(" "); 
    const navigate = useNavigate();
    const inputRef = useRef<any>(null);

    

    useEffect(() => {
        inputRef.current.focus()
    }) 

    const sendUserId = (userId: string) => { 

          socket.emit("add-user", userId);

          navigate(`/chatcontainer?userId=${userId}`)
    }

    return (
        <div>
            <label> Enter Your UserId: </label>
            <div className="w-full max-w-sm min-w-[200px]">
                <input
                ref={inputRef}
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Type here..."
                    onChange={(e) => setInput(e.target.value)}
                />

                <button
                    onClick={() => sendUserId(input)}
                    className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                    type="button"
                >
                    Enter
                </button>
            </div>
 
        </div>
    );
};

export default Home;
