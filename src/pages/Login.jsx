import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login_Style.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        console.log('Login attempt:', { username, password });
        localStorage.setItem('user', JSON.stringify({ username }));
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-badge">NOAH Application Hub</div>
                <h2>Welcome back</h2>
                <p className="login-subtitle">Masuk dengan akun perusahaan untuk melihat aplikasi, akses, dan status permintaan.</p>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-btn">
                        Masuk ke dashboard
                    </button>
                </form>

                <div className="login-help-card">
                    <div className="login-help-title">Butuh bantuan?</div>
                    <div className="login-help-text">Gunakan akun SSO perusahaan Anda. Jika belum memiliki akses, hubungi admin atau tim support.</div>
                </div>
            </div>
        </div>
    );
}

export default Login;
