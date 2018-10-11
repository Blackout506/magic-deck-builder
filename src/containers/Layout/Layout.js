import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import classes from './Layout.module.css';

import NavBar from '../../components/Navigation/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';

class Layout extends Component {

  render() {

    return (
      <div className={classes.Layout}>
        <NavBar />
        <Route path = "/" exact component={HomePage} />
      </div>
    )
  }
}

export default Layout;
