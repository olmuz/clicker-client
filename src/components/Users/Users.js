import './Users.css';

function Users({ users, myUser }) {
    return (
        <div className='Users'>
            {users.map((user, index) => (
              <div key={index}>
                <span>{user.userName} {myUser && user.userId === myUser.userId ? ' (you)' : ''}</span>
                <div
                  style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    backgroundColor: user.color,
                    marginRight: '5px',
                    marginLeft: '5px',
                    marginTop: '3px'
                  }}
                  data-testid={`color-indicator-${user.userId}`}
                ></div>
              </div>
            ))}
        </div>
      );
}

export default Users;
