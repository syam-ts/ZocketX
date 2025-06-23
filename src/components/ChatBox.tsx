  import axios from "axios";
  import { useEffect, useRef, useState } from "react";
  import socket from "../socket/socket";

  function ChatBox({ userId, selectedUser }: any) {
    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState<"">("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
      const fetchMessages = async (): Promise<void> => {
        try {
          interface Response {
            messages: string[];
          } 

          const response: Response = await axios.post(
            "http://localhost:3000/message/get-messages",
            {
              from: userId,
              to: selectedUser,
            }
          );
          
          console.log("Response; ", response);
          setMessages(response.messages);
        } catch (error) {
          console.log("ERROR: ", error);
        }
      };

      fetchMessages();
    }, []);

    useEffect(() => {
      const handleReceive = (message: any) => {
        if (message.from === selectedUser) {
          setMessages((prev) => [...prev, { ...message, from: selectedUser }]);
        }
      };
      socket.on("message-received", handleReceive);
      return () => {
        socket.off("message-received", handleReceive);
      };
    }, [selectedUser]);

    const sendMessage = async () => {
      if (!text.trim()) return;

      const newMessage = {
        from: userId,
        to: selectedUser,
        message: text,
      };

      socket.emit("send-message", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setText("");
    };

    return (
    <div className="w-full md:w-2/3 p-4 flex flex-col bg-white rounded-xl shadow-lg border border-gray-200">
    {/* Messages Area */}
    <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-300">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg break-words px-4 py-2 rounded-lg text-sm shadow-sm ${
            msg.from === userId
              ? 'bg-blue-100 text-right ml-auto'
              : 'bg-gray-100 text-left mr-auto'
          }`}
        >
          {msg.message}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>

    {/* Input Area */}
    <div className="mt-4 flex gap-2">
      <input
        type="text"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        placeholder="Type your message..."
        value={text}
        onChange={(e: any) => setText(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow hover:shadow-md text-sm"
      >
        Send
      </button>
    </div>
  </div>

    );
  }

  export default ChatBox;
