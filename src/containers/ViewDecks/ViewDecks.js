import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './ViewDecks.module.css';

import Spinner from '../../components/UI/Spinner/Spinner';
import LinkButton from '../../components/UI/LinkButton/LinkButton';
import ListItem from '../../components/ListItem/ListItem';

class ViewDecks extends Component {

  componentDidMount () {
    if (!this.props.deckList) {
      this.props.fetchDeckListHandler(this.props.token, this.props.userId);
    }
    this.props.onSetAuthRedirectPath('/ViewDecks');
  }

  createListHandler = (decks) => {
    return (
      decks.map(deck => {
        let deckName = deck.cards ? deck.cards[0].deckName : 'UNNAMED_DECK';
        let manaCost = '';
       
        for (let card in deck.cards) {
          if (deck.cards.hasOwnProperty(card)) {
            for (let key in deck.cards[card]) {
              if (deck.cards[card].hasOwnProperty(key)) {
                if (key === 'colors') {
                  manaCost += deck.cards[card][key];
                }
              }
            }
          }
        }
        
        return (
          <li key={deck.id}>
            <ListItem
              listType = "deck"
              name = {deckName}
              clicked = {null}
              manaCost = {manaCost}/>
          </li>
        );
      })
    );
  }

  render () {
    let list;

    if (this.props.loadingDeckList) {
      list = <Spinner />;
    }
    else {
      if (!this.props.deckList || this.props.deckList.length === 0) {
        list = this.props.isAuthenticated ?
          (
            <div>
              <h2 style={{color: 'red'}}><em>No saved decks!</em></h2>
              <LinkButton
                className={classes.LinkButton}
                to='/NewDeck'>Go to Deck Builder</LinkButton>
            </div>
          ) :
          (
            <div>
              <h2 style={{color: 'red'}}><em>Sign In to See Decks!</em></h2>
              <LinkButton
                className={classes.LinkButton}
                to='/Authenticate'>Log In</LinkButton>
            </div>
          );
      }
      else {
        list = this.createListHandler(this.props.deckList);
      }
    }

    return (
      <div className={classes.ViewDecks}>
        <h1>View Created Decks</h1>
        <h3><em>User: {this.props.email}</em></h3>
        <ul className={classes.DeckList}>
          {list}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    deckList: state.deck.deckList,
    loadingDeckList: state.deck.loadingGet,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    email: state.auth.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeckListHandler: (token, userId) => dispatch(actions.fetchDeckList(token, userId)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewDecks);
