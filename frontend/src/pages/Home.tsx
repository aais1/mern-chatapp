import { useEffect } from "react";

const Home = ({ socket }: { socket: any }) => {
  useEffect(() => {
    console.log('Home page mounted');
    
    socket.on('connect', () => {
      console.log('connected');
    });
    return () => {
      socket.off('connect'); 
      console.log('Home page unmounted');
    };
  }, [socket]);

  return (
    <div>Home page</div>
  );
};

export default Home;
