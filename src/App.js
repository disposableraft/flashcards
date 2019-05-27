import React from 'react';
import './App.css'
import {
  Box,
  Button,
  Card,
  Image,
  Heading,
  Text,
} from 'rebass';

function NewGameCard(props) {
  return (
    <Box px={3}>
      <Image src='/fadedSquare.png' />
      <Button onClick={() => props.onClick()}>Begin</Button>
    </Box>
  );
}

function WinningCard(props) {
  const name = findAnswer(props.flashcard.multipleChoices).name;

  const action = () => {
    if (props.isLastCard) {
      return <p>"Congratulations, you win!"</p>;
    } else {
      return <Button onClick={() => props.onClick()}>New Card</Button>;
    }
  };

  return (
    <Box px={3}>
    <Heading as='h3'>Winning!</Heading>
      <Image src={props.flashcard.image} width={200} />
      <Text>The answer was {name}</Text>
      {action()}
    </Box>
  );
}

function FlashCard(props) {
  return (
    <Box px={3}>
      <Heading as='h3'>Name that specimen:</Heading>
      <Image src={props.card.image} />
      <div>{renderChoice(0)}</div>
      <div>{renderChoice(1)}</div>
      <div>{renderChoice(2)}</div>
    </Box>
  );

  function renderChoice(i) {
    const guessed = props.guesses[i];
    return (
      <ChoiceButton
        choice={props.card.multipleChoices[i]}
        onClick={() => props.onClick(i)}
        guessIsIncorrect={guessed ? 'incorrect' : null}
      />
    );
  }
}

function ChoiceButton(props) {
  const backgroundColor = props.guessIsIncorrect ? {backgroundColor: 'red'} : null;
  return (
    <Button
      fontSize='2'
      style={backgroundColor}
      onClick={props.onClick} >
      {props.choice.name}
    </Button>
  );
}

function GameWrapper(props) {
  return (
    <Box width={450}>
      <Card
        p={1}
        borderRadius={2}
        boxShadow='0 0 16px rgba(0, 0, 0, .25)'>
        {props.children}
      </Card>
    </Box>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleGuess = this.handleGuess.bind(this);
    this.handleNewCard = this.handleNewCard.bind(this);
    this.state = {
      guesses: resetGuesses(),
      action: 'newGame',
    };
  }

  _isWinning(i) {
    return this.props.flashcard.multipleChoices[i].correct;
  }

  handleNewCard() {
    this.props.advanceToNextCard();
    this.setState(state => {
      return {
        action: 'playing',
        guesses: resetGuesses(),
      };
    });
  }

  handleGuess(i) {
    this.setState(state => {
      state.guesses[i] = 'guessed';
      state.action = this._isWinning(i) ? 'winning' : state.action;
      return state;
    });
  }

  render() {
    let gameScreen;

    switch (this.state.action) {
      case 'playing':
        gameScreen = <FlashCard
          card={this.props.flashcard}
          onClick={this.handleGuess}
          guesses={this.state.guesses}
        />
        break;

      case 'winning':
        gameScreen = <WinningCard
          flashcard={this.props.flashcard}
          isLastCard={this.props.isLastCard}
          onClick={this.handleNewCard}
        />;
        break;

      default:
        gameScreen = <NewGameCard onClick={this.handleNewCard} />
        break;
    }

    return (
      <GameWrapper>
        {gameScreen}
      </GameWrapper>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdvanceToNextCard = this.handleAdvanceToNextCard.bind(this);
    this.state = {
      currentCard: NaN,
      isLastCard: false,
    };
  }

  handleAdvanceToNextCard() {
    this.setState(state => {
      return {
        currentCard: isNaN(state.currentCard) ? 0 : state.currentCard + 1,
        isLastCard: (apiData().flashcards.length - 2) === state.currentCard,
      };
    });
  }

  render() {
    return (
      <Game
        flashcard={apiData().flashcards[this.state.currentCard]}
        advanceToNextCard={this.handleAdvanceToNextCard}
        isLastCard={this.state.isLastCard}
      />
    );
  }
}

function resetGuesses() {
  return Array(3).fill(null);
}

function findAnswer(multipleChoices) {
  return multipleChoices.find(choice => {
    return choice.correct;
  });
}

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

export default App;
