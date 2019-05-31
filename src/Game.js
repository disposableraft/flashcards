import React from 'react';
import FlashCard from './FlashCard';
import datafile from './data.json';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdvanceToNextCard = this.handleAdvanceToNextCard.bind(this);
    this.handleAddPoint = this.handleAddPoint.bind(this);
    this.state = {
      startSliceAt: 0,
      points: 0,
    }
  }

  handleAdvanceToNextCard() {
    this.setState(state => {
      return {
        startSliceAt: state.startSliceAt + 3,
      };
    });
  }

  handleAddPoint(hasGuesses) {
    this.setState(state => {
      return {
        points: hasGuesses ? state.points : (state.points + 1),
      };
    });
  }

  render() {
    const { startSliceAt, points } = this.state;
    const score = `${points} / ${(startSliceAt / 3) + 1}`;

    const multipleChoices = datafile.slice(startSliceAt, startSliceAt + 3);

    return (
      <div>
        <FlashCard
          multipleChoices={multipleChoices}
          startSliceAt={startSliceAt}
          advanceToNextCard={this.handleAdvanceToNextCard}
          addPoint={this.handleAddPoint}
          score={score}
        />
      </div>
    );
  }
}

export default Game;
