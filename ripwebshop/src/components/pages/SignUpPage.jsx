import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await signup({ firstName, lastName, email, password, confirmPassword, mobile, address });
        if (success) {
            navigate('/profile');
        }
    };

    return (
        <div className="simple-signup-container">
            <div className="simple-signup-card">
                <div className="simple-logo-container">
                    <aside className="simple-logo">VT</aside>
                    <h1 className="simple-brand">ValTrade</h1>
                </div>
                <h2 className="simple-heading">Sign Up</h2>
                <form id="signup-form" className="simple-form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input type="text" id="first-name" name="first-name" placeholder="First Name" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" id="last-name" name="last-name" placeholder="Last Name" required value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <input type="email" id="email" name="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <input type="password" id="password" name="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <input type="tel" id="mobile" name="mobile" placeholder="Mobile Number" required value={mobile} onChange={e => setMobile(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" id="address" name="address" placeholder="Home Address" required value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <button type="submit" className="simple-button">Sign Up</button>
                    <p className="simple-link">Already have an account? <Link to="/login">Sign in</Link></p>
                </form>
            </div>
        </div>
    );
}
