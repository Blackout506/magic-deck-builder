import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import LinkButton from '../../components/UI/LinkButton/LinkButton';

import classes from './Homepage.module.css';

class HomePage extends Component {

  componentDidMount() {
    this.props.onSetAuthRedirectPath('/');
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(null, mapDispatchToProps)(HomePage);
