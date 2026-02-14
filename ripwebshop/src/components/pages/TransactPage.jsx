import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function TransactPage() {
    const { cart, calculateTotals } = useCart();
    const navigate = useNavigate();

    const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails') ?? '{}');
    const deliveryOption = paymentDetails.deliveryOption ?? 'standard';

    const { subtotal, shipping, tax, total } = calculateTotals(deliveryOption);

    const orderId = useMemo(() => '#VT-' + Math.random().toString().substring(2, 11).toUpperCase(), []);
    const transactionId = useMemo(() => {
        const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
        return 'TRX-' + today + '-' + Math.random().toString().substring(2, 6);
    }, []);

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });

    const goToHome = () => {
        localStorage.removeItem('cart');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="receipt-container" id="receipt-container">
            <div className="receipt-header">
                <h2>Transaction Confirmation</h2>
                <p className="receipt-status success">✓ Payment Successful</p>
            </div>

            <div className="receipt-content">
                <div className="e-receipt">
                    <div className="receipt-top">
                        <div className="receipt-logo">VT</div>
                        <h3>ValTrade</h3>
                        <p className="receipt-tagline">Premium Gaming Products</p>
                    </div>

                    <hr className="receipt-divider" />

                    <div className="receipt-section">
                        <h4>Order Details</h4>
                        <div className="receipt-details">
                            <div className="detail-row">
                                <span>Order ID:</span>
                                <span className="detail-value">{orderId}</span>
                            </div>
                            <div className="detail-row">
                                <span>Date:</span>
                                <span className="detail-value">{dateStr}</span>
                            </div>
                            <div className="detail-row">
                                <span>Time:</span>
                                <span className="detail-value">{timeStr}</span>
                            </div>
                        </div>
                    </div>

                    <hr className="receipt-divider" />

                    <div className="receipt-section">
                        <h4>Purchased Items</h4>
                        <table className="receipt-items">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>No items found</td>
                                    </tr>
                                ) : (
                                    cart.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item?.name}</td>
                                            <td>{item?.quantity}</td>
                                            <td>₱{(item?.price ?? 0).toFixed(2)}</td>
                                            <td>₱{((item?.price ?? 0) * (item?.quantity ?? 1)).toFixed(2)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <hr className="receipt-divider" />

                    <div className="receipt-section">
                        <div className="receipt-summary">
                            <div className="summary-row">
                                <span>Subtotal:</span>
                                <span>₱{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping:</span>
                                <span>₱{shipping.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax:</span>
                                <span>₱{tax.toFixed(2)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total Amount:</span>
                                <span>₱{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="receipt-footer">
                        <p>Thank you for your purchase!</p>
                    </div>
                </div>

                <div className="receipt-actions">
                    <button className="btn-primary" onClick={() => window.print()}>Print Receipt</button>
                    <button className="btn-secondary" onClick={() => alert('Receipt download feature coming soon!')}>Download PDF</button>
                    <button className="btn-secondary" onClick={goToHome}>Continue Shopping</button>
                </div>
            </div>
        </div>
    );
}
