import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import classes from './Layout.module.css';

import NavBar from '../../components/Navigation/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import CardLookup from '../CardLookup/CardLookup';
import NewDeck from '../NewDeck/NewDeck';
import ViewDecks from '../ViewDecks/ViewDecks';

class Layout extends Component {

  render() {

    return (
      <div className={classes.Layout}>
        <NavBar />
        <Route path = '/' exact component={HomePage} />
        <Route path = '/CardLookup' exact component={CardLookup} />
        <Route path = '/NewDeck' exact component={NewDeck} />
        <Route path = '/ViewDecks' exact component={ViewDecks} />
      </div>
    )
  }
}

export default Layout;
