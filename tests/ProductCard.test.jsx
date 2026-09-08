// Import tools from React Testing Library to query the DOM and fire user click events
import { screen, fireEvent } from "@testing-library/react";
// Import testing lifecycle hooks and utilities from Vitest
import { describe, it, expect, vi } from "vitest";
// Import the actual ProductCard React component being tested
import ProductCard from "../src/components/shop/ProductCard.jsx";
// Import a custom helper that mocks React Router's Outlet Context for testing
import { renderWithOutletContext } from "../src/test-utils/renderWithOutletContext.jsx";

// Define a reusable mock product object to feed into the component properties
const mockProduct = { id: 1, title: "Fake Product", price: 9.99, image: "fake.jpg" };

// Group all related tests for the ProductCard component together
describe("ProductCard", () => {
  
  // TEST 1: Verifies that the card displays the basic information about the product
  it("renders product details", () => {
    // Render the card, passing the mock product as a prop, and provide a dummy addItem context spy
    renderWithOutletContext(<ProductCard product={mockProduct} />, { addItem: vi.fn() });

    // Assert that the title and formatted price are both visible on the screen
    expect(screen.getByText("Fake Product")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
  });

  // TEST 2: Verifies that changing the local counter works before adding to cart
  it("increments and decrements quantity", () => {
    renderWithOutletContext(
      <ProductCard product={mockProduct} />,
      { addItem: vi.fn() }
    );

    // Find the "+" button safely by searching for an accessible label /increase quantity/
    const incrementButton = screen.getByRole("button", {
      name: /increase quantity/i,
    });

    // Find the "−" button safely by searching for an accessible label /decrease quantity/
    const decrementButton = screen.getByRole("button", {
      name: /decrease quantity/i,
    });

    // Click "+" -> Quantity should go from the default 1 up to 2
    fireEvent.click(incrementButton);
    expect(screen.getByText("2")).toBeInTheDocument(); // Assert quantity is now 2

    // Click "−" -> Quantity should go back down from 2 to 1
    fireEvent.click(decrementButton);
    expect(screen.getByText("1")).toBeInTheDocument(); // Assert quantity is back to 1
  });

  // TEST 3: Verifies that the internal count logic blocks negative numbers or zero items
  it("does not decrement below 1", () => {
    renderWithOutletContext(
      <ProductCard product={mockProduct} />,
      { addItem: vi.fn() }
    );

    // Try to click the "−" button immediately when the starting quantity is already 1
    fireEvent.click(
      screen.getByRole("button", {
        name: /decrease quantity/i,
      })
    );

    // Assert that the quantity stayed locked at "1" instead of dropping to 0 or -1
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  // TEST 4: Verifies the checkout workflow: sends data to context, then cleans up the card UI
  it("calls addItem with product and current quantity, then resets quantity", () => {
    const addItem = vi.fn(); // Create a tracked spy function to intercept the context call
    renderWithOutletContext(<ProductCard product={mockProduct} />, { addItem });

    // Click the literal text "+" to bump the local quantity counter to 2
    fireEvent.click(screen.getByText("+"));
    // Click the main action button to submit the item
    fireEvent.click(screen.getByText("Add to Cart"));

    // Assert that the context handler was called with the correct object and quantity payload (2 items)
    expect(addItem).toHaveBeenCalledWith(mockProduct, 2);
    
    // Assert that the input box/counter automatically resets back to "1" after adding to cart
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
