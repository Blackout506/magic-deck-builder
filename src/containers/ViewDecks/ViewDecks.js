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
  }

  createListHandler = (decks) => {
    return (
      decks.map(deck => {
        return (
          <ListItem
            key = {deck.id}
						listType = "deck"
						name = {deck.cards[0].deckName}
						clicked = {null}/>
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
        {list}
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
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeckListHandler: (token, userId) => dispatch(actions.fetchDeckList(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewDecks);
