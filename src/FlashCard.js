import React from 'react';

class FlashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessed: Array(3).fill(false),
    }
  }

  haveTheyGuessed() {
    return this.state.guessed.find(i => {
      return i === true;
    });
  }

  handleOnClick(i) {
    if (i === this.props.correctIndex) {
      this.props.addPoint(this.haveTheyGuessed());
    } else {
      this.setState(state => {
        return state.guessed[i] = true;
      });
    }
  }

  handleAdvanceToNext() {
    this.setState(state => {
      return {
        guessed: Array(3).fill(false),
      };
    });

    this.props.advanceToNextCard();
  }

  render() {
    const { guessed } = this.state;
    const { correctIndex, gameState } = this.props;
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
            <p>Yep, the answer is <a target="_blank" rel="noopener noreferrer" href={options[correctIndex].item}>{options[correctIndex].taxonName}</a>.</p>
            <p><button onClick={() => this.handleAdvanceToNext()} >Next</button></p>
          </div>
        );
      default:
        break;
    }
  }
}

export default FlashCard;