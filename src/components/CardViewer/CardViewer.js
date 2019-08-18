import React from 'react';

import classes from './CardViewer.module.css';

const CardViewer = (props) => {

  return (
    <img className={classes.CardViewer} src={props.image} alt={props.name} />
  );

};

export default CardViewer;
