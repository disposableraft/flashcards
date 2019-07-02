import React from 'react';
import Button from '../Button';
import Definition from '../Components/Definition';

function PsychVocab(props) {
  const {
    advanceToNextCard,
    correctIndex,
    gameState,
    guessed,
    makeAGuess,
    multipleChoices,
  } = props;

  switch (gameState) {
    case 'playing':
      return (
        <div className='col-xs-12'>
          <h4 className='score right'>Score: {props.score}</h4>
          <h1 className='term left'>
            <mark>{multipleChoices[correctIndex].term}</mark>
          </h1>

          <div className='definitions left'>
            <Definition guessed={guessed[0]} onClick={() => makeAGuess(0)}>
              {multipleChoices[0].definition}
            </Definition>

            <Definition guessed={guessed[1]} onClick={() => makeAGuess(1)}>
              {multipleChoices[1].definition}
            </Definition>
            
            <Definition guessed={guessed[2]} onClick={() => makeAGuess(2)}>
              {multipleChoices[2].definition}
            </Definition>
          </div>
        </div>
      );

    case 'next':
      return (
        <div className='dataCard col-xs-12 left'>
          <h4 className='right'>Score: {props.score}</h4>
          <h1>
            <mark>{multipleChoices[correctIndex].term}</mark>
          </h1>
          <p>{multipleChoices[correctIndex].definition}</p>
          <p className='next right'><Button onClick={() => advanceToNextCard()} >Go to Next</Button></p>
        </div>
      );

    default:
      break;
  }
}

export default PsychVocab;