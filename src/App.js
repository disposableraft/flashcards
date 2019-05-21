import React from 'react';
import './App.css'
import {
  Box,
  Button,
  Card,
  Image,
  Heading,
  Link,
  Text,
} from 'rebass';

function apiData() {
  return {
    flashcards: [
      {
        image: '/cards/IMG_8587.jpg',
        multipleChoices: [
          {name: 'Dodecatheon pilchellum', correct: false},
          {name: 'Trametes versicolor', correct: true},
          {name: 'Gavia pacifica', correct: false},
        ],
      },
      {
        image: '/cards/IMG_8596.jpg',
        multipleChoices: [
          {name: 'Cantharellus cibarius', correct: true},
          {name: 'Boletus edulis', correct: false},
          {name: 'Morchella esculenta', correct: false},
        ],
      },
      {
        image: '/cards/IMG_8621.jpg',
        multipleChoices: [
          {name: 'Agaricus campestris', correct: false},
          {name: 'Ganoderma applanatum', correct: false},
          {name: 'Amanita pantherina', correct: true},
        ],
      },
    ],
  };
}

function Choice(props) {
    return (
      <Text fontSize='2' className={props.className}>
        <Link
          onClick={props.onClick}
        > {props.choice.name}
        </Link>
      </Text>
    );
}

class FlashCard extends React.Component {
  renderChoice(i) {
    const choice = this.props.card.multipleChoices[i];
    let status;
    if (this.props.guesses[i]) {
      status = choice.correct ? 'correct' : 'incorrect';
    } else {
      status = null;
    }

    return (
      <Choice
        choice={choice}
        onClick={() => this.props.onClick(i)}
        className={status}
      />
    );
  }

  render() {
    return (
      <Box px={3}>
        <Heading as='h3'>Name that specimen:</Heading>
        <Image src={this.props.card.image} />
        {this.renderChoice(0)}
        {this.renderChoice(1)}
        {this.renderChoice(2)}
      </Box>
    );
  }
}

class EmptyCard extends React.Component {
  render() {
    return (
      <Box px={3}>
        <Image src='/fadedSquare.png' />
        {this.props.children}
      </Box>
    );
  }
}

class GameScreen extends React.Component {
  render() {
    return (
      <Box width={450}>
        <Card
          p={1}
          borderRadius={2}
          boxShadow='0 0 16px rgba(0, 0, 0, .25)'>
          {this.props.children}
        </Card>
      </Box>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      currentCardIndex: -1,
      guesses: resetGuesses(),
      action: null,
    };
  }

  _getCurrentCard(i) {
    return apiData().flashcards[this.state.currentCardIndex];
  }

  _isWinning(i) {
    const currentCard = this._getCurrentCard(i)
    return currentCard.multipleChoices[i].correct;
  }

  newQuiz() {
    this.setState(state => {
      return {
        currentCardIndex: state.currentCardIndex + 1,
        action: 'playing',
      };
    });
  }

  handleClick(i) {
    if (this._isWinning(i)) {
      this.setState(state => {
        return {
          currentCardIndex: state.currentCardIndex,
          guesses: resetGuesses(),
          action: 'winning',
        }
      });
    } else {
      this.setState(state => {
        state.guesses[i] = true;
        return state;
      });
    }
  }

  render() {
    const playing = <FlashCard
      card={apiData().flashcards[this.state.currentCardIndex]}
      onClick={this.handleClick}
      {...this.state}
    />

    const winning = <EmptyCard>
      <Button onClick={() => this.newQuiz()}>Next Quiz</Button>
      </EmptyCard>

    const newGame = <EmptyCard>
      <Button onClick={() => this.newQuiz()}>New Game</Button>
      </EmptyCard>

    let window;

    switch (this.state.action) {
      case 'playing':
        window = playing
        break;
      
      case 'winning':
        window = winning;
        break;

      default:
        window = newGame;
        break;
    }
    
    return (
      <GameScreen>
        {window}
      </GameScreen>
    );
  }
}

function resetGuesses() {
  return Array(3).fill(false);
}

export default App;
