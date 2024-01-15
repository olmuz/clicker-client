import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Cell from '../Cell';

describe('Cell Component', () => {
  it('renders with the correct styles and color', () => {
    const onClickMock = jest.fn();
    const color = 'red';

    render(<Cell onClick={onClickMock} color={color} />);

    const cellElement = screen.getByTestId('cell');

    expect(cellElement).toBeInTheDocument();
    expect(cellElement).toHaveStyle({
      width: '100px',
      height: '100px',
      backgroundColor: color,
      border: '2px solid #2c3e50',
    });
  });

  it('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const color = 'blue';

    render(<Cell onClick={onClickMock} color={color} />);

    const cellElement = screen.getByTestId('cell');

    fireEvent.click(cellElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
