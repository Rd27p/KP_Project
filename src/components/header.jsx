import { useNavigate } from 'react-router-dom';
import '../style/Header_Style.css';

function Header({ title = 'Dashboard', user }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header className="app-header">
            <h2 className="header-title">{title}</h2>

            <div className="header-right">
                <span className="header-username">
                    {user ? user.username : 'Guest'}
                </span>
                <button className="header-logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
