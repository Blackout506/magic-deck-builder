import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './NewDeck.module.css';
import * as actions from '../../store/actions/index';

import SearchWithFormat from '../SearchWithFormat/SearchWithFormat';
import Button from '../../components/UI/Button/Button';
import Modal from '../Modal/Modal';
import DeckSummary from '../../components/DeckSummary/DeckSummary';

class NewDeck extends Component {
  state = {
    currentDeck: [],
    showModal: false
  };

  componentDidMount() {
    this.props.onSetAuthRedirectPath('/NewDeck');
  }

  getDeckFromChild = (dataFromChild) => {
    this.setState({
      ...this.state,
      currentDeck: dataFromChild
    });
  }

  onPreviewDeck = (event) => {
    this.setState({
      ...this.state,
      showModal: true
    });
  }

  cancelSubmitHandler = () => {
    this.setState({
      ...this.state,
      showModal: false
    });
  }

  render() {

    let pageHeader = (
      <div className={classes.PageHeader}>
        <h1 style={{display: 'inline-block'}}>Create A Deck</h1>
        {this.props.isAuthenticated ?
          <Button
            buttonType='Submit'
            clicked={this.onPreviewDeck}
            text='Preview Current Deck'/> : <h2>Log In to Save Deck!</h2> }
        <p><em>Once you have found a card you want to add to your deck, simply drag and drop the card into the dark area on the right.</em></p>
        <p><em>The search is only able to return 100 results at a time, so if you are having trouble finding a particular card, try adding more specificity to your search query.</em></p>
      </div>
    );

    return (
      <div className={classes.NewDeck}>
        <Modal
          show={this.state.showModal}
          modalClosed={this.cancelSubmitHandler}
          deck={this.state.currentDeck}>
          <DeckSummary cards={this.state.currentDeck}/>
        </Modal>
        <div className={classes.Header}>
          {pageHeader}
        <SearchWithFormat 
          callbackFromParent={this.getDeckFromChild}
          currentDeck={this.state.currentDeck}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    deck: state.deck.deck,
    isAuthenticated: state.auth.token !== null,
    loading: state.search.loading,
    results: state.search.results
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getResultsWithFormat: (searchBy, query, format) => dispatch(actions.getResultsWithFormat(searchBy, query, format)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
 