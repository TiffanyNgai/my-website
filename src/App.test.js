import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the name and the main sections', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /tiffany ngai/i })).toBeInTheDocument();
  expect(screen.getByText(/interactive ml interfaces for disease risk prediction/i)).toBeInTheDocument();
});
