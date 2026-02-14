import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    const [userData, setUserData] = useState(() => {
        return JSON.parse(localStorage.getItem('userData') ?? '{}');
    });

    const login = useCallback(async (email, password) => {
        const stored = JSON.parse(localStorage.getItem('userData') ?? '{}');

        if (stored?.email && stored.email === email) {
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
            setUserData(stored);
            await new Promise(resolve => setTimeout(resolve, 500));
            alert('Login successful! Welcome back.');
            return true;
        } else {
            alert('Invalid email or password. Please sign up first.');
            return false;
        }
    }, []);

    const signup = useCallback(async (formData) => {
        const { firstName, lastName, email, password, confirmPassword, mobile, address } = formData;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return false;
        }

        const newUserData = { firstName, lastName, email, mobile, address };
        localStorage.setItem('userData', JSON.stringify(newUserData));
        localStorage.setItem('isLoggedIn', 'true');
        setUserData(newUserData);
        setIsLoggedIn(true);

        await new Promise(resolve => setTimeout(resolve, 500));
        alert('Account created successfully! Welcome, ' + firstName + '!');
        return true;
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        setIsLoggedIn(false);
        setUserData({});
        alert('Logged out successfully');
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
