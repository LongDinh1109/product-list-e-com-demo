import { screen } from "@testing-library/react";
import ProductsGrid from "../components/Grid/index";
import { renderWithProviders } from "../test-utils";

describe("ProductsGrid Component", () => {
  test("renders products grid with items", async () => {
      const mockProducts = [
        {
          id: 1,
          title: "Test Product 1",
          price: 99.99,
          description: "Test description 1",
          category: "Test Category",
          image: "test-image-1.jpg",
          rating: { rate: 4.5, count: 100 }
        },
        {
          id: 2,
          title: "Test Product 2",
          price: 149.99,
          description: "Test description 2",
          category: "Test Category",
          image: "test-image-2.jpg",
          rating: { rate: 4.0, count: 80 }
        }
      ];    const mockStatus = 'idle';
    const mockHandleAddToCart = jest.fn();

    renderWithProviders(
      <ProductsGrid
        products={mockProducts}
        status={mockStatus}
        handleAddToCart={mockHandleAddToCart}
      />
    );
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
  });
});
