// Import tools from React Testing Library to render components and query the DOM
import { render, screen } from "@testing-library/react";
// Import testing hooks, assertion runner, and mocking utilities from Vitest
import { describe, it, expect, vi, beforeEach } from "vitest";
// Import the actual Shop React component being tested
import Shop from "../src/components/shop/Shop.jsx";
// Import the custom hook used by the Shop to fetch inventory data
import useProducts from "../src/hooks/useProducts.js";
// Import the sub-component used by the Shop to display individual items
import ProductCard from "../src/components/shop/ProductCard.jsx";

// Intercept and mock the custom hook module. 
// This stops actual network requests and allows us to fake API responses.
vi.mock("../src/hooks/useProducts.js");

// Intercept and mock the ProductCard child component module.
// This decouples the Shop test from the complex inner logic or UI of ProductCard.
vi.mock("../src/components/shop/ProductCard.jsx")

// Group all related tests for the Shop component together
describe("Shop", () => {
  
  // Runs a setup function automatically before EVERY single individual test block
  beforeEach(() => {
    // Replace the real ProductCard with a simple dummy component that only prints its title.
    // This makes asserting that cards are present incredibly simple and fast.
    ProductCard.mockImplementation(({ product }) => <div>{product.title}</div>);
  });

  // TEST 1: Verifies the UI behavior while the custom hook is in its pending state
  it("shows a loading message while loading", () => {
    // Instruct the mocked custom hook to simulate a loading state
    useProducts.mockReturnValue({ products: [], loading: true, error: null });

    // Render the main Shop layout
    render(<Shop />);

    // Assert that a loading state indicator/text is visible to the user
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  // TEST 2: Verifies the UI behavior if the backend/API data fetch fails
  it("shows an error message on error", () => {
    // Instruct the mocked custom hook to simulate a failed request state
    useProducts.mockReturnValue({ products: [], loading: false, error: "Network failure" });

    // Render the main Shop layout
    render(<Shop />);

    // Assert that an error alert or text snippet is visible to the user
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  // TEST 3: Verifies that successful API returns translate into an array of visual cards
  it("renders a product card for each product", () => {
    // Define an array of fake products that the hook will "return"
    const mockProducts = [
      { id: 1, title: "Product One", price: 9.99, image: "one.jpg" },
      { id: 2, title: "Product Two", price: 19.99, image: "two.jpg" },
    ];
    
    // Instruct the mocked custom hook to act as if a successful data response arrived
    useProducts.mockReturnValue({ products: mockProducts, loading: false, error: null });

    // Render the main Shop layout
    render(<Shop />);

    // Assert that our mocked ProductCard blocks successfully printed out both item names
    expect(screen.getByText("Product One")).toBeInTheDocument();
    expect(screen.getByText("Product Two")).toBeInTheDocument();
  });
});
