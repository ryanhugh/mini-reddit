import React from 'react';

import renderer from 'react-test-renderer';

import Home from './Home';
jest.mock('./request');


it('should render a couple posts', () => {

  const tree = renderer.create(<Home></Home>)

  expect(tree).toMatchSnapshot();
});


it('can downvote a post', () => {

  const component = renderer.create(<Home></Home>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  component.getInstance().downvote();

  expect(component.toJSON()).toMatchSnapshot();
});


it('can upvote a post', () => {

  const component = renderer.create(<Home></Home>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  component.getInstance().upvote(1);

  expect(component.toJSON()).toMatchSnapshot();
});
