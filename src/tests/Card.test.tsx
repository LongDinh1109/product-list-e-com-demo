import { screen, fireEvent } from '@testing-library/react';
import Card from '../components/Card/index';
import { renderWithProviders } from "../test-utils";
describe('Card Component', () => {
  const mockProps = {
    title: 'Test Product',
    price: 99.99,
    image: 'test-image.jpg',
    category: 'Electronics',
    rating: 4.5,
    onAddToCart: jest.fn()
  };

  test('renders product information correctly', () => {
    renderWithProviders(<Card {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProps.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.category)).toBeInTheDocument();
  });

  test('handles add to cart click', () => {
    renderWithProviders(<Card {...mockProps} />);
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockProps.onAddToCart).toHaveBeenCalledTimes(1);
  });
});
