import React from 'react';
import Button from '../Button';
import ImageCard from '../ImageCard';

function Mushrooms(props) {
  const {
    advanceToNextCard,
    correctIndex,
    gameState,
    guessed,
    makeAGuess,
    multipleChoices,
    questionNumber,
    score,
  } = props;

  const sporeLabel = multipleChoices[correctIndex].sporePrintColorLabel || 'not included';
  const edibilityLabel = multipleChoices[correctIndex].edibilityLabel || 'not included';

  switch (gameState) {
    case 'playing':
      return (
        <div className='flashCard playing'>
          <div className='col-xs-12 col-md-8'>
          <ScoreHeader score={score} questionNumber={questionNumber} />
            <ImageCard image={multipleChoices[correctIndex].image} />
          </div>
          <div className='col-xs-12 col-md-4'>
            <div className='dataCard'>
              <p>Spore color: <strong>{sporeLabel}</strong></p>
              <p>Edibility: <strong>{edibilityLabel}</strong></p>
            </div>
            <div className='multipleChoices'>
              <p><Button guessed={guessed[0]} onClick={() => makeAGuess(0)}>{multipleChoices[0].taxonName}</Button></p>
              <p><Button guessed={guessed[1]} onClick={() => makeAGuess(1)}>{multipleChoices[1].taxonName}</Button></p>
              <p><Button guessed={guessed[2]} onClick={() => makeAGuess(2)}>{multipleChoices[2].taxonName}</Button></p>
            </div>
          </div>
        </div>
      );
    case 'next':
      return (
        <div className='flashCard next'>
          <div className='col-xs-12 col-md-8'>
          <ScoreHeader score={score} questionNumber={questionNumber} />
            <ImageCard image={multipleChoices[correctIndex].image} />
          </div>
          <div className='col-xs-12 col-md-4'>
            <div className='dataCard'>
              <h4>Score: {props.score}</h4>
              <h4>
                <a target="_blank" rel="noopener noreferrer" href={multipleChoices[correctIndex].item}>{multipleChoices[correctIndex].taxonName}</a>
              </h4>
              <p>Spore color: <strong>{sporeLabel}</strong></p>
              <p>Edibility: <strong>{edibilityLabel}</strong></p>
              <p><Button onClick={() => advanceToNextCard()} >Go to Next</Button></p>
            </div>
          </div>
        </div>
      );
    default:
      break;
  }
}

function ScoreHeader(props) {
  return (
    <div className='row'>
      <div className='col-xs-6 left'>
        <h4>
          Question {props.questionNumber}
        </h4>
      </div>
      <div className='col-xs-6 right'>
        <h4>
          {props.score}
        </h4>
      </div>
    </div>
  );
}

export default Mushrooms;