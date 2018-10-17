import React, { Component } from 'react';

// import classes from './CardLookup.module.css';

import Search from "../Search/Search";

class CardLookup extends Component {

  render() {
    return (
      <div>
        <h1>Card Lookup</h1>
        <p style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}><em>For best results, I recommend searching by card or character name. I will be adding filters to search for cards by color, type, etc soon. In addition, many cards may pop up multiple times if they were introduced in several sets.</em></p>
        <Search />
      </div>
    )
  }

}

export default CardLookup;
