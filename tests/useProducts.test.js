// Import renderHook (to run hooks without a component) and waitFor (for handling async state updates)
import { renderHook, waitFor } from "@testing-library/react";
// Import testing hooks, assertion runner, and mocking utilities from Vitest
import { describe, it, expect, vi, beforeEach } from "vitest";
// Import the actual custom hook being tested
import useProducts from "../src/hooks/useProducts.js";

// Group all related tests for the useProducts custom hook together
describe("useProducts", () => {
  
  // Runs before EVERY individual test block to ensure clean isolation
  beforeEach(() => {
    // Intercept and mock the browser's global fetch API using a Vitest spy function.
    // This blocks real external HTTP requests from executing during the tests.
    globalThis.fetch = vi.fn();
  });

  // TEST 1: Verifies that the initial, immediate return value sets up a synchronous loading state
  it("starts in a loading state", () => {
    // Prime the mock fetch to resolve to an empty array whenever it is triggered
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    // Mount and run the hook code using renderHook
    const { result } = renderHook(() => useProducts());

    // Assert that on the very first synchronous render frame, loading is true and data is empty
    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
  });

  // TEST 2: Verifies that the hook successfully extracts, saves, and updates state with API data
  it("sets products on a successful fetch", async () => {
    // Define a dummy product payload that mirrors your backend's expected structure
    const mockProducts = [{ id: 1, title: "Fake Product", price: 9.99 }];
    
    // Configure the fetch spy to respond positively with the dummy payload array
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    // Mount and trigger the custom hook's internal useEffect data fetch workflow
    const { result } = renderHook(() => useProducts());

    // Pause test execution until the internal asynchronous state resolves and loading switches to false
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Assert that the hook successfully saved the payload and kept the error property clear
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBe(null);
  });

  // TEST 3: Verifies state changes when an HTTP response arrives but carries a bad status code
  it("sets an error when the response is not ok", async () => {
    // Configure the mock fetch to return a non-200 HTTP status (Server Error)
    globalThis.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useProducts());

    // Wait for the hook to catch the bad response and drop the loading indicator
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Assert that the hook correctly parses the bad status code and leaves the array empty
    expect(result.current.error).toBe("HTTP Error: 500");
    expect(result.current.products).toEqual([]);
  });

  // TEST 4: Verifies state handling when the network call totally drops (e.g., DNS or offline errors)
  it("sets an error when fetch itself rejects", async () => {
    // Configure the mock fetch to simulate a hard promise rejection (throwing an Error object)
    globalThis.fetch.mockRejectedValueOnce(new Error("Network failure"));

    const { result } = renderHook(() => useProducts());

    // Wait for the hook's catch block to intercept the crash and toggle loading off
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Assert that the error state message captures the thrown exception text
    expect(result.current.error).toBe("Network failure");
  });
});
