import React from 'react';

function FlashCard(props) {
  const {
    advanceToNextCard,
    correctIndex,
    gameState,
    guessed,
    handleMakeAGuess,
    multipleChoices,
  } = props;

  const backgroundImage = {
    background: `center / contain url(${multipleChoices[correctIndex].image}?width=500)`,
    width: '500px',
    height: '500px',
  };

  switch (gameState) {
    case 'playing':
      return (
        <div>
          <div style={backgroundImage} />
          <button style={guessed[0] ? { backgroundColor: 'red' } : null} onClick={() => handleMakeAGuess(0)}>{multipleChoices[0].taxonName}</button>
          <button style={guessed[1] ? { backgroundColor: 'red' } : null} onClick={() => handleMakeAGuess(1)}>{multipleChoices[1].taxonName}</button>
          <button style={guessed[2] ? { backgroundColor: 'red' } : null} onClick={() => handleMakeAGuess(2)}>{multipleChoices[2].taxonName}</button>
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