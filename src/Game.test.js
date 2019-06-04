import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from './Game';

configure({ adapter: new Adapter() });

jest.mock('./data.json');

describe('<Game />', () => {
  it('Should render FlashCard', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.text()).toBe('<FlashCard />');
  });

  it('Should set state.correctIndex to number between 0 and 2', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.state().correctIndex).toBeGreaterThanOrEqual(0);
    expect(wrapper.state().correctIndex).toBeLessThanOrEqual(2);
  });

  it('Should set state for data', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.state().data).toHaveLength(6);
  });

  it('Should add a point', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.state().points).toEqual(0);
    wrapper.instance().addPoint();
    expect(wrapper.state().points).toEqual(1);
    expect(wrapper.state().gameState).toEqual('next');
  });

  it('Should handle making an incorrect guess', () => {
    const wrapper = shallow(<Game />);

    // Make sure to guess the incorrect answer!
    const correctAnswer = wrapper.state().correctIndex;
    let index = 2;
    if (correctAnswer === 2) {
      index = 1;
    }

    wrapper.instance().handleMakeAGuess(index);
    const haveTheyGuessed = wrapper.instance().haveTheyGuessed();
    expect(haveTheyGuessed).toBe(true);
  });

  it('Should handle making a correct guess', () => {
    const wrapper = shallow(<Game />);
    const correctAnswer = wrapper.state().correctIndex;
    wrapper.instance().handleMakeAGuess(correctAnswer);
    expect(wrapper.state().points).toBe(1);
  });

  it('Should advance to the next flashcard', () => {
    const wrapper = shallow(<Game />);
    wrapper.instance().handleAdvanceToNextCard();
    expect(wrapper.state().startSliceAt).toBe(3);
    expect(wrapper.state().guessed).toEqual([false, false, false]);
  });

  it('Should calculate a score', () => {
    const wrapper = shallow(<Game />);
    // Winning round
    wrapper.instance().addPoint();
    const firstScore = wrapper.instance().calculateScore();
    expect(firstScore).toBe('1 / 1');
    // Losing round
    wrapper.instance().handleAdvanceToNextCard();
    const secondScore = wrapper.instance().calculateScore();
    expect(secondScore).toBe('1 / 2');
  });
});
