import React, { Component } from 'react';
import LinkButton from '../../components/UI/LinkButton/LinkButton';
import { Link } from 'react-router-dom';

import classes from './Homepage.module.css';

class HomePage extends Component {

  render() {

    return (
      <div className={classes.HomePage}>
        <LinkButton
          className={classes.LinkButton}
          to='/CardLookup'>Search For Cards</LinkButton>
        <LinkButton
          className={classes.LinkButton}
          to='/NewDeck'>Create A New Deck</LinkButton>
        <LinkButton
          className={classes.LinkButton}
          to='/ViewDecks'>View Created Decks</LinkButton>
      </div>
    )
  }

}

export default HomePage;
