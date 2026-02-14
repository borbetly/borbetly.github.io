import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="simple-login-container">
            <div className="simple-login-card">
                <div className="simple-logo-container">
                    <aside className="simple-logo">VT</aside>
                    <h1 className="simple-brand">ValTrade</h1>
                </div>
                <h2 className="simple-heading">Sign In</h2>
                <form id="login-form" className="simple-form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input type="email" id="email" name="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <input type="password" id="password" name="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="simple-button">Login</button>
                    <a href="#" className="forgot-password">Forgot Password?</a>
                    <p className="simple-link">Don't have an account? <Link to="/sign-up">Sign up</Link></p>
                </form>
            </div>
        </div>
    );
}
