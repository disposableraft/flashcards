import React from 'react';
import FlashCard from './FlashCard';
import datafile from './data.json';

const rNumber = (max) => Math.floor(Math.random() * Math.floor(max));

function getData() {
  return datafile.sort(() => Math.random() - 0.5);
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdvanceToNextCard = this.handleAdvanceToNextCard.bind(this);
    this.handleMakeAGuess = this.handleMakeAGuess.bind(this);
    this.state = {
      correctIndex: rNumber(3),
      data: getData(),
      gameState: 'playing',
      guessed: Array(3).fill(false),
      points: 0,
      startSliceAt: 0,
    }
  }

  haveTheyGuessed() {
    return this.state.guessed.find(i => {
      return i === true;
    });
  }

  handleMakeAGuess(index) {
    const winningAnswer = index === this.state.correctIndex;
    if (winningAnswer) {
      this.addPoint();
    } else {
      this.setState(state => {
        state.guessed[index] = true;
        return state;
      });
    }
  }

  handleAdvanceToNextCard() {
    this.setState(state => {
      return {
        startSliceAt: state.startSliceAt + 3,
        correctIndex: rNumber(3),
        gameState: 'playing',
        guessed: Array(3).fill(false),
      };
    });
  }

  addPoint() {
    const boolean = this.haveTheyGuessed()
    this.setState(state => {
      return {
        gameState: 'next',
        points: boolean ? state.points : (state.points + 1),
      };
    });
  }

  calculateScore() {
    return `${this.state.points} / ${(this.state.startSliceAt / 3) + 1}`;
  }

  render() {
    const { data, startSliceAt } = this.state;

    const multipleChoices = data.slice(startSliceAt, startSliceAt + 3);

    return (
      <div class='Game'>
        <FlashCard
          advanceToNextCard={this.handleAdvanceToNextCard}
          makeAGuess={this.handleMakeAGuess}
          multipleChoices={multipleChoices}
          score={this.calculateScore()}
          {...this.state}
        />
      </div>
    );
  }
}

export default Game;
