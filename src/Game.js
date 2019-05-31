import React from 'react';
import FlashCard from './FlashCard';
import datafile from './data.json';

const rNumber = (max) => Math.floor(Math.random() * Math.floor(max));

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdvanceToNextCard = this.handleAdvanceToNextCard.bind(this);
    this.addPoint = this.addPoint.bind(this);
    this.handleMakeAGuess = this.handleMakeAGuess.bind(this);
    this.state = {
      correctIndex: rNumber(3),
      startSliceAt: 0,
      points: 0,
      gameState: 'playing',
      guessed: Array(3).fill(false),
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
        return state.guessed[index] = true;
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
    const { startSliceAt } = this.state;

    const multipleChoices = datafile.slice(startSliceAt, startSliceAt + 3);

    return (
      <div>
        <FlashCard
          advanceToNextCard={this.handleAdvanceToNextCard}
          handleMakeAGuess={this.handleMakeAGuess}
          multipleChoices={multipleChoices}
          score={this.calculateScore()}
          {...this.state}
        />
      </div>
    );
  }
}

export default Game;
