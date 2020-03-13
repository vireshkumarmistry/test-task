import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

test('renders header with text: "Test Task"', () => {
  const {getByText} = render(<App/>);
  const headerElement = getByText(/Test Task/i);
  expect(headerElement).toBeInTheDocument();
});
