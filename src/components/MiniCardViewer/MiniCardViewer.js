import React from 'react';

import classes from './MiniCardViewer.module.css';

const miniCardViewer = (props) => {
  let colorClass = [];

  if (props.color === "R") {
    colorClass.push(classes.Red);
  }

  if (props.color === "B") {
    colorClass.push(classes.Black);
  }

  if (props.color === "W") {
    colorClass.push(classes.White);
  }

  if (props.color === "U") {
    colorClass.push(classes.Blue);
  }

  if (props.color === "G") {
    colorClass.push(classes.Green);
  }

  if (props.color === "undefined") {
    colorClass.push(classes.Colorless);
  }

  if (props.color === "R,G") {
    colorClass.push(classes.RedGreen);
  }

  if (props.color === "U,R") {
    colorClass.push(classes.BlueRed);
  }

  if (props.color === "U,B") {
    colorClass.push(classes.BlueBlack);
  }

  if (props.color === "U,G") {
    colorClass.push(classes.BlueGreen);
  }

  if (props.color === "W,U") {
    colorClass.push(classes.WhiteBlue);
  }

  if (props.color === "W,B") {
    colorClass.push(classes.WhiteBlack);
  }

  if (props.color === "W,R") {
    colorClass.push(classes.WhiteRed);
  }

  if (props.color === "W,G") {
    colorClass.push(classes.WhiteGreen);
  }

  if (props.color === "B,G") {
    colorClass.push(classes.BlackGreen);
  }

  if (props.color === "B,R") {
    colorClass.push(classes.BlackRed);
  }

  return (
    <li
      className={colorClass.join(" ")}
      onMouseOver={props.onMouseOver}>{props.name} | {props.manaCost}</li>
  );

};

export default miniCardViewer;
