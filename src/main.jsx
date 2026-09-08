import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {createBrowserRouter, RouterProvider} from 'react-router';

// Code for setting up React router

import routes from './routes';

/* Importing routes from routes in our folder structure */

import './index.css';

/* Importing index.css */

const router = createBrowserRouter(routes);

// Const routes manages navbar elements

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <RouterProvider router={router} />
   </StrictMode>
);

// This part of code renders our components on the page