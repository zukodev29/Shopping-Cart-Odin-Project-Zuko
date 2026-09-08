import { useState, useEffect} from "react";

// Importing so we can manage react components

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                if(!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error};
}

/* This code fetches data from fakestoreapi */

export default useProducts;

// We are exporting useProducts