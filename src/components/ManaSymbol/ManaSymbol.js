import React from 'react';
import * as classes from './ManaSymbol.module.css';

import 'mana-font';

const manaSymbol = (props) => {
  let manaClass = ''

  switch (props.value) {
    case 'R':
      manaClass = 'ms ms-r ms-cost ms-shadow';
      break;
    case 'W':
      manaClass = 'ms ms-w ms-cost ms-shadow';
      break;
    case 'B':
      manaClass = 'ms ms-b ms-cost ms-shadow';
      break;
    case 'U':
      manaClass = 'ms ms-u ms-cost ms-shadow';
      break;
    case 'G':
      manaClass = 'ms ms-g ms-cost ms-shadow';
      break;
    case 'C':
      manaClass = 'ms ms-c ms-cost ms-shadow';
      break;
    case 'X':
      manaClass = 'ms ms-x ms-cost ms-shadow';
      break;
    case '1':
      manaClass = 'ms ms-1 ms-cost ms-shadow';
      break;
    case '2':
      manaClass = 'ms ms-2 ms-cost ms-shadow';
      break;
    case '3':
      manaClass = 'ms ms-3 ms-cost ms-shadow';
      break;
    case '4':
      manaClass = 'ms ms-4 ms-cost ms-shadow';
      break;
    case '5':
      manaClass = 'ms ms-5 ms-cost ms-shadow';
      break;
    case '6':
      manaClass = 'ms ms-6 ms-cost ms-shadow';
      break;
    case '7':
      manaClass = 'ms ms-7 ms-cost ms-shadow';
      break;
    case '8':
      manaClass = 'ms ms-8 ms-cost ms-shadow';
      break;
    case '9':
      manaClass = 'ms ms-9 ms-cost ms-shadow';
      break;
    case '10':
      manaClass = 'ms ms-10 ms-cost ms-shadow';
      break;
    case '11':
      manaClass = 'ms ms-11 ms-cost ms-shadow';
      break;
    case '12':
      manaClass = 'ms ms-12 ms-cost ms-shadow';
      break;
    case '13':
      manaClass = 'ms ms-13 ms-cost ms-shadow';
      break;
    case '14':
      manaClass = 'ms ms-14 ms-cost ms-shadow';
      break;
    case '15':
      manaClass = 'ms ms-15 ms-cost ms-shadow';
      break;
    case '16':
      manaClass = 'ms ms-16 ms-cost ms-shadow';
      break;
    case '17':
      manaClass = 'ms ms-17 ms-cost ms-shadow';
      break;
    case '18':
      manaClass = 'ms ms-18 ms-cost ms-shadow';
      break;
    case '19':
      manaClass = 'ms ms-19 ms-cost ms-shadow';
      break;
    case '20':
      manaClass = 'ms ms-20 ms-cost ms-shadow';
      break;

  }
  return (
    <div className={classes.ManaSymbol}>
      <i className={manaClass}></i>
    </div>
  );
};

export default manaSymbol;
