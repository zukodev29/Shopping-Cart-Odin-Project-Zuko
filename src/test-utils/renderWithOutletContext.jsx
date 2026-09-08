import { createMemoryRouter, RouterProvider, Outlet } from "react-router";
// Importing React Router
import { render } from "@testing-library/react";

// Importing react testing library

export const renderWithOutletContext = (ui, context = {}) => {
  const routes = [
    {
      path: "/",
      element: <Outlet context={context} />,
      children: [{ index: true, element: ui }],
    },
  ];

  const router = createMemoryRouter(routes, { initialEntries: ["/"] });

  return render(<RouterProvider router={router} />);
};

// Function for testing react components