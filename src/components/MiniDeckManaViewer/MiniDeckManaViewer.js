import React from 'react';

import classes from './MiniDeckManaViewer.module.css';
import ManaSymbol from '../ManaSymbol/ManaSymbol';
import 'mana-font';

const miniDeckManaViewer = (props) => {

  let cleanManaCost = '';

  for (let i = 0; i < props.manaCost.length; i++) {
    if (props.manaCost.charAt(i) === ',') {
      cleanManaCost += '';
    }
    else {
      cleanManaCost += props.manaCost.charAt(i);
    }
  }

  let manaArray = cleanManaCost.split('');
  manaArray = [...new Set(manaArray)];  //Remove duplicates using fancy ES6 stuff

  console.log(manaArray);

  let manaCost = manaArray.map(char => {
    return (
      <ManaSymbol key={Math.random()} value={char} />
    );
  })

  return (
    <li>
        Mana Used: {manaCost}
    </li>
  );

};

export default miniDeckManaViewer;