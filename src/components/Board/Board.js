import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';
import Cell from '../Cell/Cell';
import './Board.css';
import Users from '../Users/Users';
import Popup from '../Popup/Popup';

/**
 * @typedef {import {"socket.io-client"}.Socket from "module";}
 */
function Board() {
  /**@type {Socket} */
  const socket = useSocket();

  const { id: gameId } = useParams();
  const { state: createdGame } = useLocation();

  const myRawUser = sessionStorage.getItem('myUser');
  const [myUser, setUser] = useState(JSON.parse(myRawUser))
  const [gameState, updateGameState] = useState(createdGame || {});

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    if (!Object.keys(gameState).length) {
      socket.emit('joinGame', { gameId, user: myUser }, ({ game, user }) => {
        updateGameState(game);

        sessionStorage.setItem('myUser', JSON.stringify(user));
        setUser(user);
      });
    }

    socket.on('clicked', (newGameState) => {
      updateGameState(newGameState);
    });

    socket.on('joined', (newGameState) => {
      updateGameState(newGameState);
    });

    socket.on('gameUpdate', (newGameState) => {
      updateGameState(newGameState);

      if (newGameState.stopped) {
        setShowPopup(true);
      }
    });

    socket.on('connect', () => {
      const myRawUser = sessionStorage.getItem('myUser');
      const myUser = JSON.parse(myRawUser);
      const gameId = sessionStorage.getItem('gameId');
      socket.emit('rejoinGame', { user: myUser, gameId }, (({ game }) => {
        updateGameState(game)
      }));
    });

  }, [gameId, gameState, myUser, socket]);

  function handleCellClick(index) {
    if (gameState.stopped || !gameState.started) {
      return;
    }

    const { userId } = myUser;
    socket.emit('click', { gameId, index, userId });
  }

  function handleStartGameClick() {
    socket.emit('startGame', { gameId });
  }

  function getColor(userId) {
    const { users = [] } = gameState;
    const user = users.find((user) => user.userId === userId);
    return user ? user.color : 'white';
  }

  const {
    boardSize = 3,
    boardState = Array(3 * 3),
    users = [],
    secondsLeft = 30,
    started = false
  } = gameState;

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${boardSize}, 100px)`
  }

  return (
    <div>
      <div>
        <div className='Board' style={{ display: 'inline-block' }}>
          <div style={boardStyle}>
            {boardState.map((userId, index) => (
              <Cell key={index} onClick={() => handleCellClick(index)} color={userId ? getColor(userId) : 'white'}/>
            ))}
          </div>
        </div>
        <Users users={users} myUser={myUser}/>
      </div>
        <span className='Timer'>{secondsLeft}</span>
        { myUser && myUser.owner && <button onClick={handleStartGameClick} disabled={started} className='StartGame'>Start Game</button> }
        <Popup show={showPopup} handleClose={togglePopup}>
          <p> {gameState.stopped && gameState.winner ? `Winner: ${gameState.winner.userName}` : 'Draw'}</p>
        </Popup>
    </div>
  );
}

export default Board;
