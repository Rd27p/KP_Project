import { useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import '../style/Layout_Style.css';

function Layout({ title, children }) {
    const [user] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    return (
        <div className="layout">
            <Sidebar />
            <div className="layout-main">
                <Header title={title} user={user} />
                <main className="layout-content">{children}</main>
            </div>
        </div>
    );
}

export default Layout;
