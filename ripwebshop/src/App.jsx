import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import AuthLayout from './components/layout/AuthLayout';
import HomePage from './components/pages/HomePage';
import ProductsPage from './components/pages/ProductsPage';
import CartPage from './components/pages/CartPage';
import PaymentPage from './components/pages/PaymentPage';
import TransactPage from './components/pages/TransactPage';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import ProfilePage from './components/pages/ProfilePage';
import ContactPage from './components/pages/ContactPage';
import AboutPage from './components/pages/AboutPage';
import './styles.css';

export default function App() {
    return (
        <HashRouter>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/payment" element={<PaymentPage />} />
                            <Route path="/transact" element={<TransactPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                        </Route>
                        <Route element={<AuthLayout />}>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/sign-up" element={<SignUpPage />} />
                        </Route>
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </HashRouter>
    );
}
