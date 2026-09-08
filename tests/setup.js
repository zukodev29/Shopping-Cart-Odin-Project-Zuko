// Import the assertion runner (expect) and a lifecycle hook (afterEach) from Vitest
import { expect, afterEach } from 'vitest';
// Import the cleanup utility to unmount components from the virtual DOM
import { cleanup } from '@testing-library/react';
// Import the complete suite of DOM assertions from jest-dom
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's 'expect' object with custom matchers from jest-dom.
// This is what allows you to write UI-specific assertions like:
// .toBeInTheDocument(), .toBeVisible(), or .toHaveClass()
expect.extend(matchers);

// Set up a global teardown hook that runs automatically after EVERY single test block finishes.
afterEach(() => {
  // Unmounts React trees and cleans up the simulated document body.
  // This prevents memory leaks and ensures tests don't leak state or HTML into each other.
  cleanup();
});
