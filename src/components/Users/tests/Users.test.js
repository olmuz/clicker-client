import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Users from '../Users';

describe('Users Component', () => {
  it('renders users correctly', () => {
    const users = [
      { userId: 1, userName: 'John', color: 'blue' },
      { userId: 2, userName: 'Jane', color: 'green' },
    ];

    const myUser = { userId: 1, userName: 'John', color: 'blue' };

    render(<Users users={users} myUser={myUser} />);

    // Check if each user is rendered correctly
    users.forEach((user) => {
      const userElement = screen.getByText(
        new RegExp(`${user.userName}\\s*${user.userId === myUser.userId ? '\\(you\\)' : ''}`)
      );
      expect(userElement).toBeInTheDocument();

      const colorIndicator = screen.getByTestId(`color-indicator-${user.userId}`);
      expect(colorIndicator).toBeInTheDocument();
      expect(colorIndicator).toHaveStyle({
        display: 'inline-block',
        width: '15px',
        height: '15px',
        backgroundColor: user.color,
        marginRight: '5px',
        marginLeft: '5px',
        marginTop: '3px',
      });
    });
  });
});
