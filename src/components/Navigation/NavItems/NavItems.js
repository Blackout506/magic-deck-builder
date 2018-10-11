import React from 'react';

import NavItem from "./NavItem/NavItem";

const navitems = (props) => {
  let nav = props.nav.map(item => {
    return (
      <NavItem text={item} hidden={props.hidden} sidedrawer={props.sidedrawer} clicked={props.clicked} key={item}/>
    )
  });

  return (
    <div>
      {nav}
    </div>
  )
};

export default navitems;
