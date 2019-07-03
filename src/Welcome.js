import React from 'react';
import Game from './Game';
// TODO: Load data on demand
// TODO: Allow viewer to navigate between games
import psychData from './data/psych-vocab.js';
import mushroomData from './data/mushroom-game.json';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.chooseGame = this.chooseGame.bind(this);
    this.state = {
      game: null,
      data: []
    }
  }

  chooseGame(title) {
    this.setState(state => {
      state.game = title;
      return state;
    });
  }

  render() {
    const { game } = this.state;

    switch (game) {
      case 'psych':
        return (
          <Game
            data={psychData}
            game={game}
          />
        );

      case 'mushrooms':
        return (
          <Game
            data={mushroomData}
            game={game}
            />
        );

      default:
        return (
          <div>
            <h2>Choose a Game:</h2>
            <p>
              <a onClick={() => this.chooseGame('mushrooms')} href='#' >
                Mushrooms
              </a>
            </p>
            <p>
              <a onClick={() => this.chooseGame('psych')} href='#' >
                Psychology Definitions
              </a>
            </p>
          </div>
        );
    }
  }
}

export default Welcome;