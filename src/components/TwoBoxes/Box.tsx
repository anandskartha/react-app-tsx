import React, { useState, MouseEvent } from 'react';
import './Box.css';

interface BoxProps {
  boxName: string;
  btnLabel: string;
  otherBoxCount: number;
  onIncrement: () => void;
}

const Box: React.FC<BoxProps> = ({
  boxName,
  btnLabel,
  otherBoxCount,
  onIncrement,
}) => {
  const [btnPosition, setBtnPosition] = useState({ x: 10, y: 10 });

  const handleBoxClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      const rect = e.currentTarget.getBoundingClientRect();
      console.log('rect -> ', rect);
      console.log('e.pageX -> ', e.pageX);
      console.log('e.pageY -> ', e.pageY);
      setBtnPosition({
        x: e.clientX - rect.left - 40, // Adjust for button size
        y: e.clientY - rect.top - 20,
      });
    }
  };

  return (
    <div className="box" onClick={handleBoxClick}>
      <h3>{boxName}</h3>
      <button
        className="box-button"
        style={{ left: `${btnPosition.x}px`, top: `${btnPosition.y}px` }}
        onClick={onIncrement}
      >
        {btnLabel}
      </button>
      <p>Other Box Count: {otherBoxCount}</p>
    </div>
  );
};

export default Box;
