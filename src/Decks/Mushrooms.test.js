import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Mushrooms from './Mushrooms';

configure({ adapter: new Adapter() });

const defaultProps = {
  advanceToNextCard: () => {},
  correctIndex: 0,
  gameState: 'playing',
  guessed: [false, false, false],
  makeAGuess: () => {},
  multipleChoices: [
    {
      sporePrintColorLabel: 'hot pink',
      taxonName: 'Gaulteria shallon',
    },
    {
      taxonName: 'Scientificus nameus',
    },
    {
      taxonName: 'Footarius barium',
    }
  ],
};

describe('<Mushrooms />', () => {
  const props = Object.assign({}, defaultProps);

  describe('gameState: playing', () => {
    it('Should have .playing, .dataCard and .multipleChoices', () => {
      const wrapper = shallow(<Mushrooms {...props}/>);
      expect(wrapper.find('.playing')).toHaveLength(1);
      expect(wrapper.find('.dataCard')).toHaveLength(1);
      expect(wrapper.find('.multipleChoices')).toHaveLength(1);
    });

    it('Should have three buttons', () => {
      const wrapper = shallow(<Mushrooms {...props}/>);
      const buttons = wrapper.find('Button');
      expect(buttons).toHaveLength(3);
    });
  });

  describe('gameState: next', () => {
    const props = Object.assign({}, defaultProps);
    props.gameState = 'next';

    it('Should have .next and .dataCard', () => {
      const wrapper = shallow(<Mushrooms {...props}/>);
      expect(wrapper.find('.next')).toHaveLength(1);
      expect(wrapper.find('.dataCard')).toHaveLength(1);
    });
  });
});