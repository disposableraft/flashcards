import React from 'react';
import FlashCard from './FlashCard';

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
    return (
      <div>
        <FlashCard
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
