import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { InputField } from "../components/InputField";

const Room = ({ socket }: { socket: any }) => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<any[]>([]);
  const id = searchParams.get('id');

  useEffect(() => {
    console.log('Room page mounted');

    if (id) {
      // Join the room
      socket.emit('join_room', { roomCode: id, username: localStorage.getItem('username') }); 

      
      const handleReceiveMessage = ({message,username}: {message:string;username:string}) => {
        setMessages((prevMessages) => [...prevMessages, {message,username}]);
        console.log('Received message:', message);
      };

      socket.on('receive_message', handleReceiveMessage);

      socket.on('user_joined',(msg)=>{
        
      })

      return () => {
        console.log('Room page unmounted');
        socket.off('receive_message', handleReceiveMessage);
      };
    }
  }, [socket, id]);

  return (
    <div className="">
      <div className="bg-gray-100 p-4 h-[90vh] overflow-y-scroll p-6">
        {messages.map((data, index) => (
            data.username!==localStorage.getItem('username')?
            <div className="flex justify-start relative">                
          <div key={index} className="p-2 bg-white md:w-[50%] rounded-md shadow-md my-2">
            <p className="text-gray-800">{data.message}</p>
          </div>
          <div className="absolute -bottom-[8px] left-0">
              <span className="text-gray-500 text-xs">{data.username}</span>
          </div>
            </div>
          :
          <div className="flex justify-end relative">
          <div key={index} className="p-2 bg-white md:w-[50%] rounded-md shadow-md my-2">
            <p className="text-gray-800">{data.message}</p>
          </div>
          <div className="absolute -bottom-[8px] right-0">
              <span className="text-gray-500 text-xs">{data.username}</span>
          </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-4 w-full">
        <InputField socket={socket} />
      </div>
    </div>
  );
};

export default Room;
