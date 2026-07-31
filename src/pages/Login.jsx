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
                <div className="login-badge">Application Hub</div>
                <h2>Welcome back</h2>
                <p className="login-subtitle">Log in with your company account to view applications, access, and request status.</p>
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
                        Log In
                    </button>
                </form>

                <div className="login-help-card">
                    <div className="login-help-title">Need Help?</div>
                    <div className="login-help-text">Use your company SSO account. If you do not yet have access, contact the administrator or the support team.</div>
                </div>
            </div>
        </div>
    );
}

export default Login;
