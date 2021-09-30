import { render, screen } from '@testing-library/react';
import Header from '.';


test('renders app name inside Header', () => {
  render(<Header />);
  expect(screen.getByRole('heading')).toHaveTextContent(/nova joke app/i)
});