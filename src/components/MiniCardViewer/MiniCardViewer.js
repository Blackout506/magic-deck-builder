import React from 'react';

import classes from './MiniCardViewer.module.css';
import ManaSymbol from '../ManaSymbol/ManaSymbol';
import 'mana-font';

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

  if (props.color === "undefined" || !props.color) {
    colorClass.push(classes.Colorless);
  }

  if (props.color === "R,G" || props.color === "G,R") {
    colorClass.push(classes.RedGreen);
  }

  if (props.color === "U,R" || props.color === "R,U") {
    colorClass.push(classes.BlueRed);
  }

  if (props.color === "U,B" || props.color === "B,U") {
    colorClass.push(classes.BlueBlack);
  }

  if (props.color === "U,G"|| props.color === "G,U") {
    colorClass.push(classes.BlueGreen);
  }

  if (props.color === "W,U" || props.color === "U,W") {
    colorClass.push(classes.WhiteBlue);
  }

  if (props.color === "W,B" || props.color === "B,W") {
    colorClass.push(classes.WhiteBlack);
  }

  if (props.color === "W,R" || props.color === "R,W") {
    colorClass.push(classes.WhiteRed);
  }

  if (props.color === "W,G" || props.color === "G,W") {
    colorClass.push(classes.WhiteGreen);
  }

  if (props.color === "B,G" || props.color === "G,B") {
    colorClass.push(classes.BlackGreen);
  }

  if (props.color === "B,R" || props.color === "R,B") {
    colorClass.push(classes.BlackRed);
  }

  let cleanManaCost = '';
  for (let i = 0; i < props.manaCost.length; i++) {
    if (props.manaCost.charAt(i) === '{' || props.manaCost.charAt(i) === '}') {
      cleanManaCost += '';
    }
    else {
      cleanManaCost += props.manaCost.charAt(i);
    }
    console.log(cleanManaCost);
  }

  let manaArray = cleanManaCost.split('');

  let manaCost = manaArray.map(char => {
    return (
      <ManaSymbol key={Math.random()} value={char} />
    );
  })

  return (
    <li
      className={colorClass.join(" ")}
      onMouseOver={props.onMouseOver}>{props.name} | {manaCost}
    </li>
  );

};

export default miniCardViewer;
