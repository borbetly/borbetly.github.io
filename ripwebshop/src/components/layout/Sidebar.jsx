import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/payment">To Pay</Link></li>
                    <li><Link to="/transact">Transaction</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </nav>
        </aside>
    );
}
