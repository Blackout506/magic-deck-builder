import React, { Component } from 'react';

// import classes from './CardLookup.module.css';

import Search from "../Search/Search";

class CardLookup extends Component {

  render() {
    return (
      <div>
        <h1>Card Lookup</h1>
        <p style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}><em>Try to be as specific as possible with your search query. Currently the program is set up to return all cards that contain your search in their title (for example, a search for "cat" will return many felines, but also things such as cataputs.) I will be adding filters to search for cards by color, type, etc in the future.</em></p>
        <Search />
      </div>
    )
  }

}

export default CardLookup;
