import React from 'react';

const searchBy = (props) => {
  return (
    <form>
      <label>Search By: </label>
      <label>Name</label>
      <input type='radio' name='name' checked={props.checked} onChange={props.changed}/>
      <label>Set</label>
      <input type='radio' name='set' checked={props.checked} onChange={props.changed}/>
    </form>
  );
};

export default searchBy;
