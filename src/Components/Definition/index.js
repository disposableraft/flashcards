import React from 'react';

function Definition(props) {
  if (props.guessed) {
    return (
      <p className="definition">
        <s onClick={props.onClick}>{props.children}</s>
      </p>
    );
  }
  return (
    <p onClick={props.onClick} className="definition">{props.children}</p>
  );

}
export default Definition;