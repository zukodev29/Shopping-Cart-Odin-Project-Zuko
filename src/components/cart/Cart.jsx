import {useOutletContext} from 'react-router';
import styles from './Cart.module.css';

// Importing react router and css style

const Cart = () => {
    
    const {cart,removeItem, updateQuantity,} = useOutletContext();

    if (cart.length === 0) {
        return (
            <main className={styles.empty}>
               <h1>Your Cart</h1>
               <p>Your cart is empty.</p> 
            </main>
        )
    }

    // It loads this if your cart is empty

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Calculates cart total on the page

    return (

        <main className={styles.items}>
        <h1>Your Cart</h1>

        {/**Your cart title */}

        <div className={styles.items}>
            {cart.map((item)  => (
                <article className={styles.item} key={item.id}>
                <div className={styles.imageContainer}>
                <img src={item.image} alt={item.title} />
                </div>

              <div className={styles.info}>
             <h2>{item.title}</h2>
             <p>${item.price.toFixed(2)}</p>

          {/*This part loads item in the cart, and map renders items */}

            <div className={styles.quantity}>
            <button onClick={() => updateQuantity (item.id, Math.max(1, item.quantity - 1))}>
            -
            </button>

             {/* When you click this button it decreases one item */}
            
            <span>{item.quantity}</span>

            <button onClick={() => updateQuantity (item.id, Math.max(1, item.quantity + 1))}>
            +
            </button>
            </div>


            {/* When you click this button it increases one item */}

           <button className={styles.remove} onClick={() => removeItem(item.id)}>
            Remove
           </button>
            </div>


            {/* When you click this button it removes one item */}

        <p className={styles.subtotal}> ${(item.price * item.quantity).toFixed(2)}</p>
        </article>
        ))}

         {/* Displaying subtotal */}

        </div>
       <div className={styles.total}>
        <span>Total</span>
        <strong>${total.toFixed(2)}</strong>
       </div>
         {/* Displaying total */}
        </main>

    );
};

export default Cart

// Exporting Cart