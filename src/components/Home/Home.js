import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';

/**
 * @typedef {import('socket.io-client').Socket} Socket
 */
function Home() {
    const navigate = useNavigate();

    /**@type {Socket} */
    const socket = useSocket();

    function handleCreateGameClick() {

        socket.emit('createGame', { boardSize: 3 }, (createdGame) => {
            const { id, users: [user] } = createdGame;

            console.log(user);
            sessionStorage.setItem('myUser', JSON.stringify(user));
            sessionStorage.setItem('gameId', id);

            navigate(`/games/${id}`, { state: createdGame });
        });
    }

    return (
        <>
            <button onClick={handleCreateGameClick}>Create Game</button>
        </>
    );
}

export default Home;
