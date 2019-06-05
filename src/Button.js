import React from 'react';

function Button(props) {
  const incorrectGuess = props.guessed ? 'btn-danger' : 'btn-default';

  return (
    <button
      style={props.style}
      onClick={props.onClick}
      className={`btn ${incorrectGuess}`}
      >
      {props.children}
    </button>
  );
}

export default Button;