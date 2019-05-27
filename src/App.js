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

// Empty card displays when there's no card in place
function WinningCard(props) {
  return (
    <Box px={3}>
    <Heading as='h3'>Winning!</Heading>
      <Image src={props.image} width={200} />
      <Text>The answer was {props.name}</Text>
      <Button onClick={() => props.onClick()}>New Card</Button>
    </Box>
  );
}

// Renders choice buttons
// Marks a choice if it's incorrect
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
    const guess = props.guesses[i];
    return (
      <ChoiceButton
        choice={props.card.multipleChoices[i]}
        onClick={() => props.onClick(i)}
        guessIsIncorrect={guess ? 'incorrect' : null}
      />
    );
  }
}

// Renders a choice button
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

// GameBox has no logic.
// It just has style.
function GameBox(props) {
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

// Game controls ...
// 1. Handles clicks of multiple choices
// 2. Keeps track of the card index
// 3. Keeps track of if the player is winning
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.newCard = this.newCard.bind(this);
    this.state = {
      currentCardIndex: -1,
      guesses: resetGuesses(),
      action: 'newGame',
    };
  }

  _getCurrentCard() {
    return this.props.flashcards[this.state.currentCardIndex];
  }

  _isWinning(i) {
    return this._getCurrentCard(i).multipleChoices[i].correct;
  }

  newCard() {
    this.props.onClickNextCard();
    this.setState(state => {
      return {
        action: 'playing',
        currentCardIndex: state.currentCardIndex + 1,
        guesses: resetGuesses(),
      };
    });
  }

  // handleClick sets the state when the player is winning
  // It sets the state for an option when it's been guessed
  handleClick(i) {
    this.setState(state => {
      state.guesses[i] = 'guessed';
      state.action = this._isWinning(i) ? 'winning' : state.action;
      return state;
    });
  }

  render() {
    let window;

    switch (this.state.action) {
      case 'playing':
        window = <FlashCard
          card={this._getCurrentCard()}
          onClick={this.handleClick}
          {...this.state}
        />
        break;
      
      case 'winning':
        window = <WinningCard 
          image={this._getCurrentCard().image}
          name={this._getCurrentCard().multipleChoices[this.state.currentCardIndex].name}
          onClick={this.newCard} 
        />;
        break;

      default:
        window = <NewGameCard onClick={this.newCard} />
        break;
    }
    
    return (
      <GameBox>
        {window}
      </GameBox>
    );
  }
}

// App gets data from the api
// App switches window views
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleNextCard = this.handleNextCard.bind(this);
    this.state = {
      currentCard: -1,
    };
  }

  handleNextCard() {
    this.setState(state => {
      return {
        currentCard: state.currentCard + 1
      };
    });
  }

  render() {
    return (
      <Game 
        flashcards={apiData().flashcards}
        onClickNextCard={this.handleNextCard}
      />
    );
  }
}

function resetGuesses() {
  return Array(3).fill(null);
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
