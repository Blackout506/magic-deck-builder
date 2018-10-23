import React from 'react';

import classes from './MiniCardViewer.module.css';

const miniCardViewer = (props) => {
  return (
    <li className={classes.ListItem}>{props.card}</li>
  );
};

export default miniCardViewer;
