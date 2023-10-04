import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import './Board.css';
import { Card } from '../types';

const cardImg: Card[] = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

const Board: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Card>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  //shuffle
  const shuffleCards = () => {
    const shuffledCards = [...cardImg, ...cardImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle choice
  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards: Card[]) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset choice
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns: number) => prevTurns + 1);
    setDisabled(false);
  };

  //start new game
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="root">
      <h1>Magic Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <Cell
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
}

export default Board;