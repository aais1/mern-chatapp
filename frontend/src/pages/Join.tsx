import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Join = ({socket}) => {
    const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    console.log('Join page mounted');
    
    return () => {
      console.log('Join page unmounted');
    };
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if(roomCode && username) {
        console.log('Room Code:', roomCode, 'Username:', username);
        socket.emit('join_room', { username, roomCode });
        localStorage.removeItem('username')
        localStorage.setItem('username',username)
        navigate('/room?id='+roomCode)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Join a Room</h2>
        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label htmlFor="roomCode" className="block text-sm font-medium text-gray-700">
              Room Code
            </label>
            <input
              id="roomCode"
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter room code"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your username"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}
  
  export default Join