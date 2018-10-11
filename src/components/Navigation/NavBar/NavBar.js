import React from 'react';

import classes from './NavBar.module.css';

import NavItems from "../NavItems/NavItems";

const navbar = (props) => {
  let navigation = ["Sign In"];

  return (
    <div className={classes.NavBar}>
      <h3 className={classes.Header}>Magic: the Gathering Deck Builder</h3>
      <NavItems nav={navigation} />
    </div>
  )
};

export default navbar;
