import App from "./App";
import Home from "./components/home/Home";
import Shop from "./components/shop/Shop";
import Cart from "./components/cart/Cart";

// We are importing App, Home, Shop and Cart jsx file

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "shop", element: <Shop /> },
            { path: "cart", element: <Cart /> },
        ],
    },
];


// In this part of code renders and opens Home, Shop and Cart components of the page


export default routes;

// We are exporting routes