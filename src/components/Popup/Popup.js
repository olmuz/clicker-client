import React from 'react';
import './Popup.css';

const Popup = ({ handleClose, show, children }) => {
    const displayStyle = show ? {} : { display: 'none' };
  
    return (
      <div className="popup" style={displayStyle} data-testid="popup">
        <div className="popup-main">
          {children}
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    );
  };

export default Popup;
