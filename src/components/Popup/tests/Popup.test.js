import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Popup from '../Popup'; // Adjust the path accordingly

describe('Popup Component', () => {
  it('renders with the correct styles and content', () => {
    const handleCloseMock = jest.fn();
    const childrenText = 'Popup Content';

    render(
      <Popup handleClose={handleCloseMock} show={true}>
        {childrenText}
      </Popup>
    );

    // Ensure the component is rendered
    const popupElement = screen.getByTestId('popup');
    const closeButton = screen.getByText('Close');

    expect(popupElement).toBeInTheDocument();
    expect(popupElement).toHaveStyle({ display: 'block' }); // Assuming 'display' is 'block' when show is true
    expect(screen.getByText(childrenText)).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    // Simulate closing the popup
    fireEvent.click(closeButton);
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not render when show is false', () => {
    const handleCloseMock = jest.fn();

    render(
      <Popup handleClose={handleCloseMock} show={false}>
        {'Popup Content'}
      </Popup>
    );

    // Ensure the component is not rendered when show is false
    const popupElement = screen.queryByTestId('popup');

    expect(popupElement).toBeInTheDocument(); // Check if the element is in the document
    expect(popupElement).toHaveStyle({ display: 'none' }); // Check if the display is set to 'none'
  });
});
