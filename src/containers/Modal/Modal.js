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

  componentDidUpdate() {
    console.log(this.state.deckName);
  }

  onPostDeck = (event) => {
    let deckData = [];
    this.props.deck.map(card => {
      deckData.push({
        deckName: this.state.deckName,
        name: card[0],
        colors: card[1],
        cmc: card[2],
        manaCost: card[3],
        image: card[4]
      });
    });
    this.props.onPostDeck(deckData);
    this.props.modalClosed();
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
          <p style={{color: 'black'}}><em>Name your text in the input field below. Be sure to hit Enter once you are satisfied with your name.</em></p>
          <input onKeyPress={this.handleKeyPress} />
          {this.props.children}
          {buttonBar}
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPostDeck: (deckData) => dispatch(actions.postDeck(deckData))
  };
}

export default connect(null, mapDispatchToProps)(Modal);
