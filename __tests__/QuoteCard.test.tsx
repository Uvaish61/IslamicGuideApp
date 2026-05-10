import React from 'react';
import renderer from 'react-test-renderer';
import QuoteCard, { Quote } from '../src/components/QuoteCard';

describe('QuoteCard', () => {
  it('renders correctly with given quote', () => {
    const sample: Quote = { id: 999, text: 'Test quote text', source: 'Test Source' };
    const tree = renderer.create(<QuoteCard quote={sample} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
