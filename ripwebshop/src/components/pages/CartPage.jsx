import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart, calculateTotals, totalItems } = useCart();
    const navigate = useNavigate();

    const { subtotal, tax, total } = calculateTotals();

    const proceedToCheckout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }
        navigate('/payment');
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <h2>Shopping Cart</h2>
                <div className="cart-content">
                    <div className="empty-cart-message" style={{ display: 'block' }}>
                        <p>Your cart is empty</p>
                        <button className="btn-primary" onClick={() => navigate('/products')}>Continue Shopping</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h2>Shopping Cart</h2>
            <div className="cart-content">
                <div className="cart-items-section">
                    <div id="cart-items-container">
                        {cart.map((item, i) => (
                            <div className="cart-item" key={i}>
                                <div className="item-image">
                                    <img src={item?.image || 'placeholder.png'} alt={item?.name} width="80" height="80" />
                                </div>
                                <div className="item-info">
                                    <h4>{item?.name}</h4>
                                    <p className="item-price">₱{(item?.price ?? 0).toFixed(2)}</p>
                                    <p className="item-description">{item?.description ?? 'Premium item'}</p>
                                </div>
                                <div className="item-quantity">
                                    <button className="qty-btn" onClick={() => updateQuantity(i, (item?.quantity ?? 1) - 1)}>-</button>
                                    <input type="number" className="qty-input" value={item?.quantity ?? 1} readOnly />
                                    <button className="qty-btn" onClick={() => updateQuantity(i, (item?.quantity ?? 1) + 1)}>+</button>
                                </div>
                                <div className="item-total">
                                    <p>₱{((item?.price ?? 0) * (item?.quantity ?? 1)).toFixed(2)}</p>
                                </div>
                                <button className="remove-btn" onClick={() => removeFromCart(i)}>✕</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-box">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>₱{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Items:</span>
                            <span>{totalItems}</span>
                        </div>
                        <div className="summary-row">
                            <span>Estimated Tax (12%):</span>
                            <span>₱{tax.toFixed(2)}</span>
                        </div>
                        <hr />
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>₱{total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="cart-actions">
                        <button className="btn-primary btn-full" onClick={proceedToCheckout}>Proceed to Checkout</button>
                        <button className="btn-secondary btn-full" onClick={() => navigate('/products')}>Continue Shopping</button>
                        <button className="btn-danger btn-full" onClick={clearCart}>Clear Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
