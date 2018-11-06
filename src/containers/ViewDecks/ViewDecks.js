import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './ViewDecks.module.css';

import Spinner from '../../components/UI/Spinner/Spinner';
import LinkButton from '../../components/UI/LinkButton/LinkButton';

class ViewDecks extends Component {

  componentDidMount () {
    if (!this.props.deckList) {
      this.props.fetchDeckListHandler();
    }
  }

  componentDidUpdate () {
    console.log(this.props.deckList);
  }

  createListHandler = (decks) => {
    return (
      decks.map(deck => {
        return (
          <ListItem
            key = {deck.id}
						listType = "deck"
						name = {deck.name}
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
        list = (
          <div>
            <h2 style={{color: 'red'}}><em>No saved decks!</em></h2>
            <LinkButton
              className={classes.LinkButton}
              to='/NewDeck'>Go to Deck Builder</LinkButton>
          </div>
        );
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
    loadingDeckList: state.deck.loadingGet
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeckListHandler: (deckList) => dispatch(actions.fetchDeckList(deckList))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewDecks);
