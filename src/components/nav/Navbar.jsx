import {Link} from "react-router";
import styles from './Navbar.module.css';

// Importing react-router and css style

const Navbar = ({cartCount}) => {
    return (
        <nav className={styles.navbar}>
        <Link to='/' className={styles.logo}>
        Store
        </Link>

        <ul className={styles.link}>
        <li>
        <Link to='/'>Home</Link>
        </li>

       <li>
        <Link to='/shop'>Shop</Link>
       </li>

       <li>
        <Link to="/cart" className={styles.cartLink}>
        Cart
        <span className={styles.cartCount}>{cartCount}</span>
        </Link>
       </li>
        </ul>
        </nav>
    )
}

/* Arrow function for Navigation bar, in nav bar we have link for: Home, Shop and Cart, in Cart you can see amount of item that
are in the cart */

export default Navbar;

// Exporting nav bar