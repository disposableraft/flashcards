import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';

configure({ adapter: new Adapter() });

const defaultProps = {
  style: {},
  onClick: () => {},
  guessed: false,
};

describe('<Button />', () => {
  it('Should render children', () => {
    const wrapper = shallow(<Button {...defaultProps}>Binomial name</Button>);
    expect(wrapper.text()).toBe('Binomial name');
  });

  describe('Player has not guessed', () => {
    it('Should render btn-default', () => {
      const wrapper = shallow(<Button {...defaultProps} />);
      expect(wrapper.find('.btn-default')).toHaveLength(1);
    });
  });

  describe('Player has guessed', () => {
    const props = Object.assign({}, defaultProps);
    props.guessed = true;
    it('Should render btn-danger', () => {
      const wrapper = shallow(<Button {...props} />);
      expect(wrapper.find('.btn-danger')).toHaveLength(1);
    });
  });
});