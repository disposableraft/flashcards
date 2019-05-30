import React from 'react';
import datafile from './data.json';

const rNumber = (max) => Math.floor(Math.random() * Math.floor(max));

class FlashCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            correctIndex: rNumber(3),
            guessed: Array(3).fill(false),
        }
    }

    handleOnClick(i){
        if (i === this.state.correctIndex) {
            alert('You win');
            this.setState(state => {
                return {
                    correctIndex: rNumber(3),
                    guessed: Array(3).fill(false),
                };
            });
            
            const hasGuesses = this.state.guessed.find(i => {
                return i === true;
            });

            this.props.advanceToNextCard(hasGuesses);
        } else {
            alert('Wrong');
            this.setState(state => {
                return state.guessed[i] = true;
            });
        }
    }

    render() {
        const options = datafile.slice(this.props.startSliceAt, this.props.startSliceAt + 3);
        
        return (
            <div>
                <p><img src={options[this.state.correctIndex].image + '?width=250'} alt='What is this mushroom?' /></p>
                <button style={this.state.guessed[0] ? {backgroundColor: 'red'} : null} onClick={() => this.handleOnClick(0)}>{options[0].taxonName}</button>
                <button style={this.state.guessed[1] ? {backgroundColor: 'red'} : null} onClick={() => this.handleOnClick(1)}>{options[1].taxonName}</button>
                <button style={this.state.guessed[2] ? {backgroundColor: 'red'} : null} onClick={() => this.handleOnClick(2)}>{options[2].taxonName}</button>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleAdvanceToNextCard = this.handleAdvanceToNextCard.bind(this);
        this.state = {
            startSliceAt: 0,
            score: 0,
        }
    }

    handleAdvanceToNextCard(hasGuesses) {
        this.setState(state => {
            const { startSliceAt, score } = state;
            return {
                startSliceAt: startSliceAt + 3,
                score: hasGuesses ? score : (score + 1),
            };
        });
    }

    render() {
        const { startSliceAt, score } = this.state;
        return (
            <div>
                <p>Score: {score} / {(startSliceAt / 3)}</p>
                <FlashCard 
                    startSliceAt={startSliceAt}
                    advanceToNextCard={this.handleAdvanceToNextCard}
                />
            </div>
        );
    }
}

export default App;
