import './Cell.css';

function Cell({ onClick, color }) {
  const cellStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: color,
    border: '2px solid #2c3e50'
  };

  return (
    <div className="Cell" onClick={onClick} style={cellStyle} data-testid="cell"/>
  );
}

export default Cell;
