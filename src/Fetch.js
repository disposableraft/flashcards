import React from 'react';
import datafile from './data.json';

const rNumber = (max) => Math.floor(Math.random() * Math.floor(max));

class FlashCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            correctIndex: rNumber(3),
            guessed: Array(3).fill(false),
            gameState: 'playing',
        }
    }

    handleOnClick(i){
        if (i === this.state.correctIndex) {
            const hasGuesses = this.state.guessed.find(i => {
                return i === true;
            });
            this.setState(state => {
                return {
                    gameState: 'next'
                };
            });
            this.props.addPoint(hasGuesses)
        } else {
            this.setState(state => {
                return state.guessed[i] = true;
            });
        }
    }

    onClickNext() {
        this.setState(state => {
            return {
                correctIndex: rNumber(3),
                guessed: Array(3).fill(false),
                gameState: 'playing'
            };
        });

        this.props.advanceToNextCard();
    }

    render() {
        const options = datafile.slice(this.props.startSliceAt, this.props.startSliceAt + 3);

        switch (this.state.gameState) {
            case 'playing':
                return (
                    <div>
                        <p><img src={options[this.state.correctIndex].image + '?width=500'} alt='What is this mushroom?' /></p>
                        <button style={this.state.guessed[0] ? {backgroundColor: 'red'} : null} onClick={() => this.handleOnClick(0)}>{options[0].taxonName}</button>
                        <button style={this.state.guessed[1] ? {backgroundColor: 'red'} : null} onClick={() => this.handleOnClick(1)}>{options[1].taxonName}</button>
                        <button style={this.state.guessed[2] ? {backgroundColor: 'red'} : null} onClick={() => this.handleOnClick(2)}>{options[2].taxonName}</button>
                    </div>
                );
            case 'next':
                return (
                    <div>
                        <p><img src={options[this.state.correctIndex].image + '?width=500'} alt='What is this mushroom?' /></p>
                        <p>Score: {this.props.score}</p>
                        <p>Yep, the answer is {options[this.state.correctIndex].taxonName}.</p>
                        <p><button onClick={() => this.onClickNext()} >Next</button></p>
                    </div>
                );
            default:
                break;
        }
    }
}

class App extends React.Component {
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

export default App;
