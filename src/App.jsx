import {Outlet} from 'react-router';
// Importing Outlet from react router
import Navbar from './components/nav/Navbar';
// Import Navbar from Navbar so you can click on navigation part of the page
import {useState} from 'react'
// Importing used state so we can manage React components

// Const App arrow function
const App = () => {
    const [cart, setCart] = useState([]);
    // This part contains item const part and useState part initializes shopping cart empty

    const addItem = (product, quantity) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === product.id)
            if(existing) {
              return prevCart.map((item) =>
            item.id === product.id
              ? {...item, quantity: item.quantity + quantity}
              : item
            );
            }
            return [...prevCart, { id: product.id, title: product.title, price: product.price, image: product.image, quantity},];
        })
    }
   // Adds item

    const removeItem = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !==id));
    }

    // Removes item

    const updateQuantity = (id, quantity) => {
        setCart((prevCart) => 
            prevCart.map((item) => (item.id === id ? {...item, quantity} : item))
        )
    }

    // Updates quantity (number) of item

    //This const addITem adds item into cart, removes item, it, it gives information about item price, id, image, quantity(number).

    const cartCount = cart.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    // It gives us information of total items in the cart

    return(
      <>
      <Navbar cartCount={cartCount} />
      <Outlet context={{cart, addItem, removeItem, updateQuantity}} />
      </>
    );
}

// This part renders number of items that we chose on our page and that are in shopping cart

// And Outlet context is react router component it can render children in navbar component

export default App;

// With this we export our file so it can be imported