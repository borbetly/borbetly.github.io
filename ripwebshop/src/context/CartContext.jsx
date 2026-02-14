import { createContext, useContext, useState, useCallback } from 'react';
import CONFIG from '../data/config';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem('cart') ?? '[]');
    });

    const saveCart = useCallback((newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    }, []);

    const addToCart = useCallback((product) => {
        setCart(prev => {
            const existing = prev.find(item => item?.id === product?.id);
            let newCart;
            if (existing) {
                newCart = prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                newCart = [...prev, { ...product, quantity: 1 }];
            }
            localStorage.setItem('cart', JSON.stringify(newCart));
            alert(`${product?.name} added to cart!`);
            return newCart;
        });
    }, []);

    const removeFromCart = useCallback((index) => {
        setCart(prev => {
            const newCart = prev.filter((_, i) => i !== index);
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });
    }, []);

    const updateQuantity = useCallback((index, quantity) => {
        if (quantity <= 0) {
            removeFromCart(index);
            return;
        }
        setCart(prev => {
            const newCart = prev.map((item, i) =>
                i === index ? { ...item, quantity } : item
            );
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        if (confirm('Are you sure you want to clear your entire cart?')) {
            localStorage.removeItem('cart');
            setCart([]);
        }
    }, []);

    const calculateTotals = useCallback((deliveryOption = 'standard') => {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += (item?.price ?? 0) * (item?.quantity ?? 0);
        });
        const shipping = CONFIG.DELIVERY_OPTIONS[deliveryOption]?.price ?? 0;
        const tax = subtotal * CONFIG.TAX_RATE;
        const total = subtotal + shipping + tax;
        return { subtotal, shipping, tax, total };
    }, [cart]);

    const totalItems = cart.reduce((sum, item) => sum + (item?.quantity ?? 0), 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            calculateTotals,
            totalItems,
            saveCart
        }}>
            {children}
        </CartContext.Provider>
    );
}
