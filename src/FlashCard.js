import React from 'react';

function FlashCard(props) {
  const {
    advanceToNextCard,
    correctIndex,
    gameState,
    guessed,
    makeAGuess,
    multipleChoices,
  } = props;

  const backgroundImage = {
    background: `center / contain url(${multipleChoices[correctIndex].image}?width=500)`,
    width: '500px',
    height: '500px',
  };

  const buttonStyle = (index) => {
    return {
      backgroundColor: guessed[index] ? 'red' : null,
      width: '500px',
      padding: '0.5em',
      marginTop: '0.75em',
      fontSize: '1em',
    }
  };


  switch (gameState) {
    case 'playing':
      return (
        <div>
          <div style={backgroundImage} />
          <button style={buttonStyle(0)} onClick={() => makeAGuess(0)}>{multipleChoices[0].taxonName}</button>
          <button style={buttonStyle(1)} onClick={() => makeAGuess(1)}>{multipleChoices[1].taxonName}</button>
          <button style={buttonStyle(2)} onClick={() => makeAGuess(2)}>{multipleChoices[2].taxonName}</button>
        </div>
      );
    case 'next':
      return (
        <div>
          <div style={backgroundImage} />
          <p>Score: {props.score}</p>
          <p>Yep, the answer is <a target="_blank" rel="noopener noreferrer" href={multipleChoices[correctIndex].item}>{multipleChoices[correctIndex].taxonName}</a>.</p>
          <p><button onClick={() => advanceToNextCard()} >Next</button></p>
        </div>
      );
    default:
      break;
  }
}

export default FlashCard;