import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './Modal.module.css';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Button from '../../components/UI/Button/Button';

class Modal extends Component {
  state = {
    deckName: ''
  };

  onPostDeck = (event) => {
    let cardList = [];
    this.props.deck.map(card => {
      cardList.push({
        deckName: this.state.deckName,
        name: card[0],
        colors: card[1],
        cmc: card[2],
        manaCost: card[3],
        image: card[4]
      });
    });
    let deckData = { cards: cardList, userId: this.props.userId }
    this.props.onPostDeck(deckData, this.props.token);
    this.props.modalClosed();
  }

  inputChangedHandler = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      deckName: event.target.value
    });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.setState({
        ...this.state,
        deckName: event.target.value
      });
    }
  }

  render() {
    let buttonBar = (
      <div>
        <Button
          buttonType='ModalSuccess'
          clicked={this.onPostDeck}
          text='Save Deck'/>
        <Button
          buttonType='Danger'
          clicked={this.props.modalClosed}
          text='Go Back'/>
      </div>
    );

    return (
      <div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          <p style={{color: 'black'}}><em>Name your deck in the input field below.</em></p>
          <input onKeyPress={this.handleKeyPress} onChange={this.inputChangedHandler}/>
          {this.props.children}
          {buttonBar}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPostDeck: (deckData, token) => dispatch(actions.postDeck(deckData, token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
