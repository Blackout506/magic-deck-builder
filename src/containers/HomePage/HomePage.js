import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';

import classes from './Homepage.module.css';

class HomePage extends Component {

  render() {

    return (
      <div className={classes.HomePage}>
        <Button
          text="Create A New Deck"
          buttonType="Success"/>
        <Button
          text="View Created Decks"
          buttonType="Success"/>
      </div>
    )
  }

}

export default HomePage;
