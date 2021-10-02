import { render, screen } from '@testing-library/react';
import Loading from '.';

test('renders Loading message', () => {
  render(<Loading />);
  const loadingMessage1 = screen.getByText(/Loading.../i);
  const loadingMessage2 = screen.getByText(/If persists check your network or refresh the page/i);
  expect(loadingMessage1).toBeInTheDocument();
  expect(loadingMessage2).toBeInTheDocument();
});
