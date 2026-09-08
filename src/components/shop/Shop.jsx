import useProducts from '../../hooks/useProducts';
import ProductCard from './ProductCard';
import styles from './Shop.module.css';

// Importing useProducts from hooks folder, Product cart from shop folder and style css

const Shop = () => {
    const {products, loading, error} = useProducts();

    // For products, loading and error we use useProducts function

    if(loading) return <p className={styles.status}>Loading products...</p>;
    if(error) return <p className={styles.status}>Error: {error}</p>;

   // Error and loading elements on the page

    return(
     <main className={styles.shop}>
    <div className={styles.heading}>
    <h1>Shop</h1>
    <p>Browse our collection</p>
    </div>

    {/* Shop title and paragraph */}

     <div className={styles.products}>
    {products.map((product) => (
        <ProductCard key={product.id} product={product} />
    ))}

    {/* Function for rendering items in shopping cart */}
     </div>
     </main>
    );
};

// Exporting Shop

export default Shop;