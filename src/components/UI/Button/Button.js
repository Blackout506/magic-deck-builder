import React from 'react';

const Button = (props) => (
  let names = [];

  switch (props.buttonType){
    case "Success":
      // names.push(classes.Success);
      break;
  }

  return (
    <button className={names.join(" ")} disabled={props.disabled}>{props.text}</button>
  );
);

export default Button;
