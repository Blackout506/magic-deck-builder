import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './CardLookup.module.css';

import Search from "../Search/Search";

class CardLookup extends Component {

  componentDidMount() {
    this.props.onSetAuthRedirectPath('/CardLookup');
  }

  render() {
    return (
      <div className={classes.CardLookup}>
        <h1>Card Lookup</h1>
        <p><em>For best results, I recommend searching by card or character name. I will be adding filters to search for cards by color, type, etc soon. In addition, many cards may pop up multiple times if they were introduced in several sets.</em></p>
        <p><em>The search is only able to return 100 results at a time, so if you are having trouble finding a particular card, try adding more specificity to your search query.</em></p>
        <Search />
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(null, mapDispatchToProps)(CardLookup);
