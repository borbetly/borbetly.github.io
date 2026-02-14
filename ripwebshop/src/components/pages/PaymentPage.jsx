import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function PaymentPage() {
    const { cart, calculateTotals } = useCart();
    const navigate = useNavigate();

    const [delivery, setDelivery] = useState('standard');
    const [payment, setPayment] = useState('credit');

    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postal, setPostal] = useState('');
    const [country, setCountry] = useState('Philippines');
    const [terms, setTerms] = useState(false);

    const { subtotal, shipping, tax, total } = calculateTotals(delivery);

    const showCardDetails = ['credit', 'debit'].includes(payment);

    const formatCardNumber = (value) => {
        const cleaned = value.replace(/\s/g, '');
        return cleaned.match(/.{1,4}/g)?.join(' ') ?? cleaned;
    };

    const formatExpiryDate = (value) => {
        const cleaned = value.replace(/\D/g, '');
        return cleaned.length >= 2 ? cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) : cleaned;
    };

    const formatCVV = (value) => {
        return value.replace(/[^0-9]/g, '');
    };

    const validateForm = () => {
        const required = [email, fullName, phone, address, city, province, postal];
        if (!required.every(v => v.trim())) {
            alert('Please fill in all required fields');
            return false;
        }
        if (!terms) {
            alert('Please agree to the Terms and Conditions');
            return false;
        }
        if (showCardDetails) {
            const rawCard = cardNumber.replace(/\s/g, '');
            if (rawCard.length !== 16 || cardCvv.length !== 3) {
                alert('Invalid card details');
                return false;
            }
        }
        return true;
    };

    const processPayment = () => {
        if (!validateForm()) return;

        const paymentData = {
            email,
            fullName,
            phone,
            address,
            city,
            province,
            postal,
            country,
            paymentMethod: payment,
            deliveryOption: delivery
        };

        localStorage.setItem('paymentDetails', JSON.stringify(paymentData));
        alert('Payment processed successfully!');
        navigate('/transact');
    };

    return (
        <div className="payment-container">
            <h2>Checkout</h2>

            <div className="checkout-grid">
                <div className="checkout-form">
                    <div className="checkout-section">
                        <h3>Order Summary</h3>
                        <div className="order-summary">
                            <div className="summary-item">
                                <span>Subtotal:</span>
                                <span>₱{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-item">
                                <span>Shipping:</span>
                                <span>₱{shipping.toFixed(2)}</span>
                            </div>
                            <div className="summary-item">
                                <span>Tax:</span>
                                <span>₱{tax.toFixed(2)}</span>
                            </div>
                            <div className="summary-item total">
                                <span>Total:</span>
                                <span>₱{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="checkout-section">
                        <h3>Delivery Options</h3>
                        <div className="delivery-options">
                            <label className="delivery-option">
                                <input type="radio" name="delivery" value="standard" checked={delivery === 'standard'} onChange={() => setDelivery('standard')} />
                                <div className="delivery-info">
                                    <span className="delivery-name">Standard Delivery</span>
                                    <span className="delivery-time">5-7 Business Days</span>
                                    <span className="delivery-price">₱50.00</span>
                                </div>
                            </label>
                            <label className="delivery-option">
                                <input type="radio" name="delivery" value="express" checked={delivery === 'express'} onChange={() => setDelivery('express')} />
                                <div className="delivery-info">
                                    <span className="delivery-name">Express Delivery</span>
                                    <span className="delivery-time">2-3 Business Days</span>
                                    <span className="delivery-price">₱150.00</span>
                                </div>
                            </label>
                            <label className="delivery-option">
                                <input type="radio" name="delivery" value="overnight" checked={delivery === 'overnight'} onChange={() => setDelivery('overnight')} />
                                <div className="delivery-info">
                                    <span className="delivery-name">Overnight Delivery</span>
                                    <span className="delivery-time">Next Business Day</span>
                                    <span className="delivery-price">₱300.00</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="checkout-section">
                        <h3>Payment Method</h3>
                        <div className="payment-methods">
                            <label className="payment-method">
                                <input type="radio" name="payment" value="credit" checked={payment === 'credit'} onChange={() => setPayment('credit')} />
                                <div className="payment-info">
                                    <span className="payment-name">Credit Card</span>
                                    <span className="payment-desc">Visa, Mastercard, Amex</span>
                                </div>
                            </label>
                            <label className="payment-method">
                                <input type="radio" name="payment" value="debit" checked={payment === 'debit'} onChange={() => setPayment('debit')} />
                                <div className="payment-info">
                                    <span className="payment-name">Debit Card</span>
                                    <span className="payment-desc">Any debit card</span>
                                </div>
                            </label>
                            <label className="payment-method">
                                <input type="radio" name="payment" value="ewallet" checked={payment === 'ewallet'} onChange={() => setPayment('ewallet')} />
                                <div className="payment-info">
                                    <span className="payment-name">E-Wallet</span>
                                    <span className="payment-desc">GCash, PayMaya, Alipay</span>
                                </div>
                            </label>
                            <label className="payment-method">
                                <input type="radio" name="payment" value="bank" checked={payment === 'bank'} onChange={() => setPayment('bank')} />
                                <div className="payment-info">
                                    <span className="payment-name">Bank Transfer</span>
                                    <span className="payment-desc">Direct bank transfer</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {showCardDetails && (
                        <div className="checkout-section" id="card-details-section">
                            <h3>Card Information</h3>
                            <div className="form-group">
                                <label htmlFor="card-name">Cardholder Name</label>
                                <input type="text" id="card-name" placeholder="Full Name" value={cardName} onChange={e => setCardName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="card-number">Card Number</label>
                                <input type="text" id="card-number" placeholder="0000 0000 0000 0000" maxLength="19" value={cardNumber} onChange={e => setCardNumber(formatCardNumber(e.target.value))} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="card-expiry">Expiry Date</label>
                                    <input type="text" id="card-expiry" placeholder="MM/YY" maxLength="5" value={cardExpiry} onChange={e => setCardExpiry(formatExpiryDate(e.target.value))} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="card-cvv">CVV</label>
                                    <input type="text" id="card-cvv" placeholder="000" maxLength="3" value={cardCvv} onChange={e => setCardCvv(formatCVV(e.target.value))} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="checkout-section">
                        <h3>Billing Address</h3>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" placeholder="your.email@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="full-name">Full Name</label>
                            <input type="text" id="full-name" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" placeholder="+63 XXX XXX XXXX" value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Street Address</label>
                            <input type="text" id="address" placeholder="Street Address" value={address} onChange={e => setAddress(e.target.value)} />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" id="city" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="province">Province</label>
                                <input type="text" id="province" placeholder="Province" value={province} onChange={e => setProvince(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="postal">Postal Code</label>
                                <input type="text" id="postal" placeholder="Postal Code" value={postal} onChange={e => setPostal(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input type="text" id="country" placeholder="Philippines" value={country} onChange={e => setCountry(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="checkout-section">
                        <label className="terms-checkbox">
                            <input type="checkbox" id="terms" checked={terms} onChange={e => setTerms(e.target.checked)} />
                            <span>I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a></span>
                        </label>
                    </div>
                </div>

                <div className="checkout-items">
                    <h3>Items in Cart</h3>
                    <div className="cart-items-list">
                        {cart.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            cart.map((item, i) => (
                                <div className="cart-item" key={i}>
                                    <div className="item-details">
                                        <h4>{item?.name}</h4>
                                        <p className="item-quantity">Qty: {item?.quantity}</p>
                                    </div>
                                    <div className="item-price">
                                        ₱{((item?.price ?? 0) * (item?.quantity ?? 1)).toFixed(2)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="checkout-actions">
                <button className="btn-secondary" onClick={() => navigate('/cart')}>Back to Cart</button>
                <button className="btn-primary" onClick={processPayment}>Complete Payment</button>
            </div>
        </div>
    );
}
