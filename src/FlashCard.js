import React from 'react';

function FlashCard(props) {
  const {
    advanceToNextCard,
    correctIndex,
    gameState,
    guessed,
    handleMakeAGuess,
  } = props;

  const options = props.multipleChoices;

  switch (gameState) {
    case 'playing':
      return (
        <div>
          <p><img src={options[correctIndex].image + '?width=500'} alt='What is this mushroom?' /></p>
          <button style={guessed[0] ? { backgroundColor: 'red' } : null} onClick={() => handleMakeAGuess(0)}>{options[0].taxonName}</button>
          <button style={guessed[1] ? { backgroundColor: 'red' } : null} onClick={() => handleMakeAGuess(1)}>{options[1].taxonName}</button>
          <button style={guessed[2] ? { backgroundColor: 'red' } : null} onClick={() => handleMakeAGuess(2)}>{options[2].taxonName}</button>
        </div>
      );
    case 'next':
      return (
        <div>
          <p><img src={options[correctIndex].image + '?width=500'} alt='What is this mushroom?' /></p>
          <p>Score: {props.score}</p>
          <p>Yep, the answer is <a target="_blank" rel="noopener noreferrer" href={options[correctIndex].item}>{options[correctIndex].taxonName}</a>.</p>
          <p><button onClick={() => advanceToNextCard()} >Next</button></p>
        </div>
      );
    default:
      break;
  }
}

export default FlashCard;