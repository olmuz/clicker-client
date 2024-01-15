import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_SERVER_CONNECT_URL || 'http://localhost:8080');

        setSocket(newSocket);

        return () => {
            console.log('newSocket.disconnect()');
            newSocket.disconnect()
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
};
