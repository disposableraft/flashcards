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

  const buttonStyle = (index) => {
    return {
      backgroundColor: guessed[index] ? 'red' : null,
    }
  };


  switch (gameState) {
    case 'playing':
      return (
        <div className='row'>
          <div className='col-xs-12 col-md-4'>
            <ImageCard image={multipleChoices[correctIndex].image} />
          </div>
          <div className='col-xs-12 col-md-8'>
            <p><Button style={buttonStyle(0)} onClick={() => makeAGuess(0)}>{multipleChoices[0].taxonName}</Button></p>
            <p><Button style={buttonStyle(1)} onClick={() => makeAGuess(1)}>{multipleChoices[1].taxonName}</Button></p>
            <p><Button style={buttonStyle(2)} onClick={() => makeAGuess(2)}>{multipleChoices[2].taxonName}</Button></p>
          </div>
        </div>
      );
    case 'next':
      return (
        <div className='row'>
          <div className='col-xs-12 col-md-4'>
            <ImageCard image={multipleChoices[correctIndex].image} />
          </div>
          <div className='col-xs-12 col-md-8'>
            <p>Score: {props.score}</p>
            <p>Yep, the answer is <a target="_blank" rel="noopener noreferrer" href={multipleChoices[correctIndex].item}>{multipleChoices[correctIndex].taxonName}</a>.</p>
            <p><Button onClick={() => advanceToNextCard()} >Next</Button></p>
          </div>
        </div>
      );
    default:
      break;
  }
}

function ImageCard(props) {
  const style = {
    background: `center / contain url(${props.image}?width=500)`,
    width: '100%',
    height: '500px',
  };
  
  return (
    <div style={style}>
      <h3>Loading animation ... - \ | /</h3>
      {props.children}
    </div>
  );
}

function Button(props) {
  return (
    <button
      style={props.style}
      onClick={props.onClick}
      className='btn btn-default'>
      {props.children}
    </button>
  );
}

export default FlashCard;