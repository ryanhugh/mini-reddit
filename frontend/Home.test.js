import React from 'react';
import renderer from 'react-test-renderer';

import Home from './Home';

// Unit tests for Home.js

// Mock out the request file with Jest's mocking tools to ensure that real XMLHttpRequests are not sent.
jest.mock('./request');

it('should render a couple posts', () => {

  const tree = renderer.create(<Home></Home>)

  // Use Jest's snapshotting feature to ensure that the DOM does not change. 
  // Jest saves these files in the __snapshots__ folder. 
  expect(tree).toMatchSnapshot();
});


it('can downvote a post', () => {

  const component = renderer.create(<Home></Home>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // Trigger the callback
  component.getInstance().downvote(1);

  expect(component.toJSON()).toMatchSnapshot();
});


it('can upvote a post', () => {

  const component = renderer.create(<Home></Home>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // Trigger the callback
  component.getInstance().upvote(1);

  expect(component.toJSON()).toMatchSnapshot();
});
