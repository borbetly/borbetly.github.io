import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function AuthLayout() {
    const location = useLocation();

    useEffect(() => {
        const isLogin = location.pathname === '/login';
        const bodyClass = isLogin ? 'login-page' : 'signup-page';
        document.body.classList.add(bodyClass);
        return () => {
            document.body.classList.remove('login-page', 'signup-page');
        };
    }, [location.pathname]);

    return <Outlet />;
}
