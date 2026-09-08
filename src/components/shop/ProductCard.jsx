import { useState } from "react";
import { useOutletContext } from "react-router";
import styles from "./ProductCard.module.css"

// Importing other elements similar to previous jsx files

//useOutletContext is a React Router hook that lets parent routes share data or state 
// directly with child routes without prop drilling

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useOutletContext();

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

    // This increases and decreases quantity of items in shopping cart 

    const handleAddToCart = () => {
        addItem(product, quantity);
        setQuantity(1);
    };

    // Adding items to cart

    return (
        <article className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                className={styles.image}
                src={product.image}
                alt={product.title}
                />
            </div>

        {/* Item info like: title, image and etc.*/}

            <div className={styles.content}>
                <h2 className={styles.title}>{product.title}</h2>

                <p className={styles.price}>
                ${product.price.toFixed(2)}
                </p>

                    {/* Items info to: title, and price in dollars */}

                <div className={styles.quantity}>
                <button aria-label={`Decrease quantity of ${product.title}`} onClick={handleDecrement}>−</button>

                {/* Decrease amount of item */}

                <span>{quantity}</span>

                {/* Amount of item */}

                <button aria-label={`Increase quantity of ${product.title}`} onClick={handleIncrement}>+</button>
                </div>

               {/* Increases amount of item */}

                <button
                className={styles.addButton}
                onClick={handleAddToCart}
                >
                Add to Cart
                </button>

             {/* Adds to cart item button */}

            </div>
        </article>
    );
};

export default ProductCard;

// Exporting ProductCard