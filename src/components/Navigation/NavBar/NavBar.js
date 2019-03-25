import React from 'react';
import { Link } from 'react-router-dom';

import classes from './NavBar.module.css';

import NavItems from "../NavItems/NavItems";

const navbar = (props) => {
  let navMessage = props.isAuth ? "Logout" : "Authenticate";
  let navigation = [navMessage];

  return (
    <div className={classes.NavBar}>
      <Link to="/">
        <h3 className={classes.Header}>Magic: the Gathering Deck Builder</h3>
      </Link>
      <NavItems nav={navigation} />
    </div>
  )
};

export default navbar;
