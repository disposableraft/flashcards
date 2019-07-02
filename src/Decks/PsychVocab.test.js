import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PsychVocab from './PsychVocab';

configure({ adapter: new Adapter() });

const defaultProps = {
  advanceToNextCard: () => {},
  correctIndex: 0,
  gameState: 'playing',
  guessed: [false, false, false],
  makeAGuess: () => {},
  multipleChoices: [
    {
      term: 'hot pink',
      definition: 'A color as seen by an eye',
    },
    {
      definition: 'A brand name commonly seen',
    },
    {
      definition: 'A heat-inducing skin tone',
    }
  ],
};

describe('<PsychVocab />', () => {
  const props = Object.assign({}, defaultProps);

  describe('gameState: playing', () => {
    it('Should have three <Definition />s', () => {
      const wrapper = shallow(<PsychVocab {...props}/>);
      expect(wrapper.find('Definition')).toHaveLength(3);
    });

    it('Should have a score', () => {
      const wrapper = shallow(<PsychVocab {...props}/>);
      const score = wrapper.find('.score');
      expect(score).toHaveLength(1);
    });
  });

  describe('gameState: next', () => {
    const props = Object.assign({}, defaultProps);
    props.gameState = 'next';

    it('Should have .next and .dataCard', () => {
      const wrapper = shallow(<PsychVocab {...props}/>);
      expect(wrapper.find('.next')).toHaveLength(1);
      expect(wrapper.find('.dataCard')).toHaveLength(1);
    });
  });
});