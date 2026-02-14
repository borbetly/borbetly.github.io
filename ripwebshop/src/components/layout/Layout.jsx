import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout() {
    return (
        <>
            <Header />
            <aside className="container">
                <Sidebar />
                <main id="main-content">
                    <Outlet />
                </main>
            </aside>
            <Footer />
        </>
    );
}
