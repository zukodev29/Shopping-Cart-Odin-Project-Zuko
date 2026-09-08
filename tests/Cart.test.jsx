// Import tools from React Testing Library to query the DOM, fire events, and scope queries
import { screen, fireEvent, within } from "@testing-library/react";
// Import testing lifecycle hooks and utilities from Vitest
import { describe, it, expect, vi } from "vitest";
// Import the actual Cart React component being tested
import Cart from "../src/components/cart/Cart.jsx";
// Import a custom helper that mocks React Router's Outlet Context for testing
import { renderWithOutletContext } from "../src/test-utils/renderWithOutletContext";

// Define a reusable mock cart item to avoid repetitive data definition across tests
const mockCart = [
  {
    id: 1,
    title: "Fake Product",
    price: 10,
    image: "fake.jpg",
    quantity: 2,
  },
];

// Group all related tests for the Cart component together
describe("Cart", () => {
  
  // TEST 1: Verifies the UI state when there are no items in the cart
  it("shows a message when the cart is empty", () => {
    // Render the Cart component with an empty cart array and dummy functions
    renderWithOutletContext(<Cart />, {
      cart: [],
      removeItem: vi.fn(), // vi.fn() creates a blank mock/spy function
      updateQuantity: vi.fn(),
    });

    // Assert that the empty state text is visible on the screen
    expect(
      screen.getByText(/your cart is empty/i) // /.../i makes the search case-insensitive
    ).toBeInTheDocument();
  });

  // TEST 2: Verifies that items and their computed subtotals display correctly
  it("renders cart items and their subtotal", () => {
    // Render the Cart with our pre-defined mock item (1 item, price $10, quantity 2)
    renderWithOutletContext(<Cart />, {
        cart: mockCart,
        removeItem: vi.fn(),
        updateQuantity: vi.fn(),
    });

    // Assert that core item details appear somewhere on the screen
    expect(screen.getByText("Fake Product")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    // Find the specific container (<article>) holding this specific product
    // This prevents checking text globally and ensures the subtotal is in the right place
    const cartItem = screen
        .getByRole("heading", { name: "Fake Product" })
        .closest("article");

    // Assert that the item's subtotal (Price $10 * Quantity 2 = $20) is inside its own container
    expect(
        within(cartItem).getByText("$20.00")
    ).toBeInTheDocument();
  });

  // TEST 3: Verifies clicking the plus button signals a quantity increase
  it("increments item quantity", () => {
    const updateQuantity = vi.fn(); // Create a tracked spy function

    renderWithOutletContext(<Cart />, {
      cart: mockCart,
      removeItem: vi.fn(),
      updateQuantity, // Pass the spy to the component context
    });

    // Simulate the user clicking the "+" button
    fireEvent.click(screen.getByText("+"));

    // Assert that the component called the function with: (product_id: 1, new_quantity: 3)
    expect(updateQuantity).toHaveBeenCalledWith(1, 3);
  });

  // TEST 4: Verifies clicking the minus button signals a quantity decrease
  it("decrements item quantity", () => {
    const updateQuantity = vi.fn(); // Create a tracked spy function

    renderWithOutletContext(<Cart />, {
      cart: mockCart,
      removeItem: vi.fn(),
      updateQuantity, // Pass the spy to the component context
    });

    // Simulate the user clicking the "−" button
    fireEvent.click(screen.getByText("−"));

    // Assert that the component called the function with: (product_id: 1, new_quantity: 1)
    expect(updateQuantity).toHaveBeenCalledWith(1, 1);
  });

  // TEST 5: Verifies clicking the remove button signals item deletion
  it("removes an item from the cart", () => {
    const removeItem = vi.fn(); // Create a tracked spy function

    renderWithOutletContext(<Cart />, {
      cart: mockCart,
      removeItem, // Pass the spy to the component context
      updateQuantity: vi.fn(),
    });

    // Simulate the user clicking the button that says "remove" (case-insensitive)
    fireEvent.click(
      screen.getByRole("button", { name: /remove/i })
    );

    // Assert that the component called the function with the correct product ID (1)
    expect(removeItem).toHaveBeenCalledWith(1);
  });

  // TEST 6: Verifies that multiple items are summed up correctly into a grand total
  it("calculates the total price of all cart items", () => {
    // Define an ad-hoc cart array with multiple items for math verification
    const cart = [
      {
        id: 1,
        title: "Product One",
        price: 10,
        image: "one.jpg",
        quantity: 2, // Subtotal: $20.00
      },
      {
        id: 2,
        title: "Product Two",
        price: 5.5,
        image: "two.jpg",
        quantity: 3, // Subtotal: $16.50
      },
    ];

    renderWithOutletContext(<Cart />, {
      cart,
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
    });

    // Grand Total Math: (10 * 2) + (5.50 * 3) = 20.00 + 16.50 = 36.50
    // Assert that the final calculated total string exists in the document
    expect(screen.getByText("$36.50")).toBeInTheDocument();
  });
});
