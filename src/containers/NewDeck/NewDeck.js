import React, { Component } from 'react';

import classes from './NewDeck.module.css';

import Search from '../Search/Search';
import DropArea from '../DropArea/DropArea';

class NewDeck extends Component {

  render() {
    return (
      <div className={classes.NewDeck}>
        <div className={classes.SearchArea}>
          <h1>Create A Deck</h1>
          <p><em>Search for cards and drag them to the area on the right to create a deck.</em></p>
          <Search />
        </div>
        <div className={classes.DropArea}>
          <DropArea />
        </div>
      </div>
    );
  }

}

export default NewDeck;
