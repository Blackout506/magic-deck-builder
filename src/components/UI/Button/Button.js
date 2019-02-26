import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  let names = [];

  switch (props.buttonType) {
    case "Success":
      names.push(classes.Success);
      break;
    case "ModalSuccess":
      names.push(classes.ModalSuccess);
      break;
    case "Submit":
      names.push(classes.Submit);
      break;
    case "Danger":
      names.push(classes.Danger);
      break;
    default:
      names.push(classes.Submit);
  }

  return (
    <button className={names.join(" ")} onClick={props.clicked} disabled={props.disabled}>{props.text}</button>
  );
};

export default Button;
