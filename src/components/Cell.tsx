import React from 'react';
import './Cell.css';
import { Card } from '../types';

interface CellProps {
  // Your code here
  card: Card;
  handleChoice: (card: Card) => void
  flipped: boolean;
  disabled: boolean
}

const Cell: React.FC<CellProps> = (props: CellProps) => {
  // Render cell with shape and color, use CSS to style based on shape and color.
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card" />
        <img
          className="back"
          src="/img/cover.png"
          onClick={handleChoice}
          alt="cover"
        />
      </div>
    </div>
  )
};

export default Cell;
