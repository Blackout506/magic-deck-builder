import React, { Component } from 'react';

import classes from './NewDeck.module.css';

class NewDeck extends Component {

  render() {
    return (
      <div className={classes.NewDeck}>
        <h1>Lets make a new deck yo</h1>
      </div>
    )
  }

}

export default NewDeck;