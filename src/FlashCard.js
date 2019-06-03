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


  switch (gameState) {
    case 'playing':
      return (
        <div>
          <div className='col-xs-12 col-md-8'>
            <ImageCard image={multipleChoices[correctIndex].image} />
          </div>
          <div className='col-xs-12 col-md-4'>
            <div className='dataCard'>
              <p>Spore color: <strong>Foo</strong></p>
              <p>Edibility: <strong>Bar</strong></p>
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
        <div>
          <div className='col-xs-12 col-md-8'>
            <ImageCard image={multipleChoices[correctIndex].image} />
          </div>
          <div className='col-xs-12 col-md-4'>
            <div className='dataCard'>
              <p>Score: {props.score}</p>
              <p>Yep, the answer is <a target="_blank" rel="noopener noreferrer" href={multipleChoices[correctIndex].item}>{multipleChoices[correctIndex].taxonName}</a>.</p>
              <p><Button onClick={() => advanceToNextCard()} >Next</Button></p>
            </div>
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
  };
  
  return (
    <div 
      style={style} 
      class="imageCard ">
      {props.children}
    </div>
  );
}

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

export default FlashCard;