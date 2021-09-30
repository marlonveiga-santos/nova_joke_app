import { render, screen } from '@testing-library/react';
import App from './App';
import Header from './components/Header'

test('renders app name', () => {
  render(<App />);
  const appName = screen.getByText(/nova joke app/i);
  expect(appName).toBeInTheDocument();
});

test('renders app header', () => {
  render(<Header />);
  const headerElement = screen.getByRole("heading");
  expect(headerElement).toBeInTheDocument();
});
