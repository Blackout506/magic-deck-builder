import React from 'react';

import classes from './DeckSummary.module.css';

const deckSummary = (props) => {
  const cardSummary = props.cards.map(card => {
      return (
        <li key={Math.random()}>{card[0]}{card[3]}</li>
      );
  });
  return (
    <div className={classes.DeckSummary}>
      <h3>Your Deck</h3>
      <ul>
        {cardSummary}
      </ul>
    </div>
  );
};

export default deckSummary;
