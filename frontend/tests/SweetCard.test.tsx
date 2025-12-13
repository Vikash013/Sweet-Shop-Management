// TDD: RED PHASE - Sweet Card Component Tests
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SweetCard } from '../src/components/SweetCard';

describe('SweetCard Component - TDD', () => {
  const mockSweet = {
    id: 1,
    name: 'Chocolate Cake',
    description: 'Delicious chocolate cake',
    price: 15.99,
    quantity: 5,
    category: 'Cakes',
    imageUrl: 'https://example.com/cake.jpg'
  };

  const mockOnPurchase = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // RED: This test will fail initially
  it('should render sweet information correctly', () => {
    render(<SweetCard sweet={mockSweet} onPurchase={mockOnPurchase} />);
    
    expect(screen.getByText(mockSweet.name)).toBeInTheDocument();
    expect(screen.getByText(mockSweet.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockSweet.price}`)).toBeInTheDocument();
    expect(screen.getByText(`Stock: ${mockSweet.quantity}`)).toBeInTheDocument();
    expect(screen.getByText(mockSweet.category)).toBeInTheDocument();
  });

  // RED: This test will fail initially
  it('should show sweet image when imageUrl is provided', () => {
    render(<SweetCard sweet={mockSweet} onPurchase={mockOnPurchase} />);
    
    const image = screen.getByAltText(mockSweet.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockSweet.imageUrl);
  });

  // RED: This test will fail initially
  it('should show placeholder when no imageUrl is provided', () => {
    const sweetWithoutImage = { ...mockSweet, imageUrl: undefined };
    render(<SweetCard sweet={sweetWithoutImage} onPurchase={mockOnPurchase} />);
    
    expect(screen.getByText(/no image available/i)).toBeInTheDocument();
  });

  // RED: This test will fail initially
  it('should enable purchase button when quantity > 0', () => {
    render(<SweetCard sweet={mockSweet} onPurchase={mockOnPurchase} />);
    
    const purchaseButton = screen.getByRole('button', { name: /purchase/i });
    expect(purchaseButton).toBeEnabled();
  });

  // RED: This test will fail initially
  it('should disable purchase button when quantity is 0', () => {
    const outOfStockSweet = { ...mockSweet, quantity: 0 };
    render(<SweetCard sweet={outOfStockSweet} onPurchase={mockOnPurchase} />);
    
    const purchaseButton = screen.getByRole('button', { name: /out of stock/i });
    expect(purchaseButton).toBeDisabled();
  });

  // RED: This test will fail initially
  it('should call onPurchase when purchase button is clicked', async () => {
    const user = userEvent.setup();
    render(<SweetCard sweet={mockSweet} onPurchase={mockOnPurchase} />);
    
    const purchaseButton = screen.getByRole('button', { name: /purchase/i });
    await user.click(purchaseButton);
    
    expect(mockOnPurchase).toHaveBeenCalledWith(mockSweet.id);
  });

  // RED: This test will fail initially
  it('should show low stock warning when quantity <= 5', () => {
    const lowStockSweet = { ...mockSweet, quantity: 3 };
    render(<SweetCard sweet={lowStockSweet} onPurchase={mockOnPurchase} />);
    
    expect(screen.getByText(/low stock/i)).toBeInTheDocument();
  });

  // RED: This test will fail initially
  it('should not show low stock warning when quantity > 5', () => {
    const normalStockSweet = { ...mockSweet, quantity: 10 };
    render(<SweetCard sweet={normalStockSweet} onPurchase={mockOnPurchase} />);
    
    expect(screen.queryByText(/low stock/i)).not.toBeInTheDocument();
  });
});