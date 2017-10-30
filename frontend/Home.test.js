import React from 'react';

import renderer from 'react-test-renderer';

import Home from './Home';
jest.mock('./request');



it('should render a couple posts', () => {

  const tree = renderer.create(<Home></Home>)

  expect(tree).toMatchSnapshot();
});


it('should render a couple posts', () => {

const component = renderer.create(
    <Home>Facebook</Home>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.downvote();

  // const tree = renderer.create(<Home></Home>).toJSON();

  // console.log(tree.props.__proto__)

  // expect(tree).toMatchSnapshot();
});
