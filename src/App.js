import React from 'react';
import './App.css'
import {
  Box,
  Card,
  Image,
  Heading,
  Text,
} from 'rebass';

function apiData() {
  return {
    flashcards: [
      {
        image: '/cards/IMG_8587.jpg',
        choices: [
          {name: 'Dodecatheon pilchellum', correct: false},
          {name: 'Trametes versicolor', correct: true},
          {name: 'Gavia pacifica', correct: false},
        ],
      },
      {
        image: '/cards/IMG_8596.jpg',
        choices: [
          {name: 'Cantharellus cibarius', correct: true},
          {name: 'Boletus edulis', correct: false},
          {name: 'Morchella esculenta', correct: false},
        ],
      },
      {
        image: '/cards/IMG_8621.jpg',
        choices: [
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
        <input
          disabled={props.disabled}
          name="guess-the-name"
          onClick={props.onClick}
          type="radio"
        />
        <label htmlFor="foo">
            &nbsp;
            {props.choice.name}
        </label>
      </Text>
    );
}

class FlashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerWon: false,
      selected: Array(3).fill(false)
    }
  }

  handleClick(i) {
    const state = Object.assign({}, this.state);
    const winning = this.props.card.choices[i].correct;
    state.selected[i] = true;
    state.playerWon = winning;
    this.setState(state);
    
    if (winning) {
      this.props.nextCard();
    }
  }

  renderChoice(i) {
    const choice = this.props.card.choices[i];

    let status;

    if (this.state.selected[i]) {
      status = choice.correct ? 'correct' : 'incorrect';
    } else {
      status = null;
    }

    return (
      <Choice
        disabled={this.state.selected[i]}
        choice={choice}
        onClick={() => this.handleClick(i)}
        className={status}
      />
    );
  }

  render() {
    return (
      <Box width={512}>
        <Card
          p={1}
          borderRadius={2}
          boxShadow='0 0 16px rgba(0, 0, 0, .25)'>
          <Image src={this.props.card.image} />
          <Box px={3}>
            <Heading as='h3'>
              Name that specimen:
            </Heading>
            {this.renderChoice(0)}
            {this.renderChoice(1)}
            {this.renderChoice(2)}
          </Box>
        </Card>
      </Box>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleNextCard = this.handleNextCard.bind(this);
    this.state = {
      currentCard: 0,
    };
  }

  handleNextCard() {
    this.setState((state) => {
      return {currentCard: state.currentCard + 1};
    });
  }

  render() {
    return (
      <FlashCard
        card={apiData().flashcards[this.state.currentCard]}
        nextCard={this.handleNextCard}
      />
    );
  }
}

export default App;
