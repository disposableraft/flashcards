import React from 'react';

const rNumber = (max) => Math.floor(Math.random() * Math.floor(max));

class FlashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctIndex: rNumber(3),
      guessed: Array(3).fill(false),
      gameState: 'playing',
    }
  }

  handleOnClick(i) {
    if (i === this.state.correctIndex) {
      const hasGuesses = this.state.guessed.find(i => {
        return i === true;
      });
      this.setState(state => {
        return {
          gameState: 'next'
        };
      });
      this.props.addPoint(hasGuesses)
    } else {
      this.setState(state => {
        return state.guessed[i] = true;
      });
    }
  }

  onClickNext() {
    this.setState(state => {
      return {
        correctIndex: rNumber(3),
        guessed: Array(3).fill(false),
        gameState: 'playing'
      };
    });

    this.props.advanceToNextCard();
  }

  render() {
    const { guessed, correctIndex, gameState } = this.state;
    const options = this.props.multipleChoices;

    switch (gameState) {
      case 'playing':
        return (
          <div>
            <p><img src={options[correctIndex].image + '?width=500'} alt='What is this mushroom?' /></p>
            <button style={guessed[0] ? { backgroundColor: 'red' } : null} onClick={() => this.handleOnClick(0)}>{options[0].taxonName}</button>
            <button style={guessed[1] ? { backgroundColor: 'red' } : null} onClick={() => this.handleOnClick(1)}>{options[1].taxonName}</button>
            <button style={guessed[2] ? { backgroundColor: 'red' } : null} onClick={() => this.handleOnClick(2)}>{options[2].taxonName}</button>
          </div>
        );
      case 'next':
        return (
          <div>
            <p><img src={options[correctIndex].image + '?width=500'} alt='What is this mushroom?' /></p>
            <p>Score: {this.props.score}</p>
            <p>Yep, the answer is {options[correctIndex].taxonName}.</p>
            <p><button onClick={() => this.onClickNext()} >Next</button></p>
          </div>
        );
      default:
        break;
    }
  }
}

export default FlashCard;