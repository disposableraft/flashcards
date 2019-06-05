import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageCard from './ImageCard';

configure({ adapter: new Adapter() });

const defaultProps = {
  style: {},
  image: 'https://example.com',
};

describe('<ImageCard />', () => {
  it('Should render children', () => {
    const wrapper = shallow(<ImageCard {...defaultProps}>Theoretical content</ImageCard>);
    expect(wrapper.text()).toBe('Theoretical content');
  });
});
