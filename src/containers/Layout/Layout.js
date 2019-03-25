import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Layout.module.css';

import NavBar from '../../components/Navigation/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import CardLookup from '../CardLookup/CardLookup';
import NewDeck from '../NewDeck/NewDeck';
import ViewDecks from '../ViewDecks/ViewDecks';
import SignIn from '../SignIn/SignIn';
import Logout from '../SignIn/Logout/Logout';

class Layout extends Component {

  render() {

    return (
      <div className={classes.Layout}>
        <NavBar isAuth={this.props.isAuthenticated}/>
        <Route path = '/' exact component={HomePage} />
        <Route path = '/CardLookup' exact component={CardLookup} />
        <Route path = '/NewDeck' exact component={NewDeck} />
        <Route path = '/ViewDecks' exact component={ViewDecks} />
        <Route path = '/Authenticate' exact component={SignIn} />
        <Route path = '/Logout' exact component={Logout} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
export default withRouter(
  connect(mapStateToProps)(Layout)
);
