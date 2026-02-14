import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Header() {
    const { isLoggedIn, logout } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header>
            <aside className="logo-container">
                <aside className="logo">VT</aside>
                <h1>ValTrade</h1>
            </aside>
            <nav className="header-nav">
                <Link to="/cart" className="cart-btn">
                    <img src="/assets/241px-Classic_shimmer_VALORANT.png" alt="Shopping Cart" className="cart-icon" />
                    {totalItems > 0 && (
                        <span className="cart-badge">{totalItems}</span>
                    )}
                </Link>
                {isLoggedIn ? (
                    <>
                        <Link to="/profile" className="profile-btn">P</Link>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="login-btn">Login</Link>
                )}
            </nav>
        </header>
    );
}
