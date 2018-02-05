import React from 'react';
import Home from '../components/Home';
import renderer from 'react-test-renderer';

it('renders', () => {
  const tree = renderer
    .create(<Home/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});