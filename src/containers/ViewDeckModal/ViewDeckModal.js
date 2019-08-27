import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './ViewDeckModal.module.css';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Button from '../../components/UI/Button/Button';
import MiniCardViewer from '../../components/MiniCardViewer/MiniCardViewer';

class ViewDeckModal extends Component {

  render() {
    let buttonBar = (
      <div>
        <Button
          buttonType='Danger'
          clicked={this.props.modalClosed}
          text='Go Back'/>
      </div>
    );

    let deckList = this.props.deckList.map(card => {
      console.log(card);
        return (
            <MiniCardViewer
              key={Math.random()}
              name={card.name}
              color={card.colors}
              manaCost={card.manaCost}
              image={card.image}/>
        );
    });

    return (
      <div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div
          className={classes.ViewDeckModal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          <p><strong>{this.props.deckName}</strong></p>
          <p style={{fontSize: '18px'}}><em>User: {this.props.user}</em></p>
          <div>
            {deckList}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewDeckModal);
