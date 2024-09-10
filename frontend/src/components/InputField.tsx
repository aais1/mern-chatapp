import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Socket } from "socket.io-client";

export const InputField = ({ socket }: { socket: Socket }) => {
  const [message, setMessage] = useState("");
  const [roomCode,setRoomCode] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(()=>{
    setRoomCode(searchParams.get('id')!);
  },[])
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (message.trim()) {
      socket.emit('send_message', { roomCode, message ,username:localStorage.getItem('username') });
      console.log("Message sent:", message);
      
      setMessage("");
    }
  };

  return (
    <div className="bg-white flex items-center p-4 h-[10vh]">
      <form onSubmit={handleSubmit} className="flex space-x-2 md:w-[70%]">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 w-[120px] active:scale-95 duration-150 text-white rounded-md hover:bg-blue-600 flex-shrink-0"
        >
          Send
        </button>
      </form>
    </div>
  );
};
