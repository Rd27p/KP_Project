// Ganti sesuai port backend ASP.NET Core kamu.
// Cek di Properties/launchSettings.json project backend -- biasanya https://localhost:7xxx
// atau http://localhost:5xxx. Taruh nilainya di file .env di root project React:
//   VITE_API_URL=https://localhost:7042
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5010';

/**
 * Login ke backend. Melempar Error dengan pesan dari backend kalau gagal
 * (mis. "Username atau password salah" dari status 401).
 */
export async function login(username, password) {
    const response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || 'Login gagal. Coba lagi.');
    }

    return data; // { message, token, user: { id, username, email, nama, nik, telp } }
}

/**
 * Helper untuk request lain yang butuh auth (mis. GET /api/Applications nanti),
 * otomatis menyisipkan token dari localStorage.
 */
export async function authFetch(path, options = {}) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || `Request gagal (${response.status})`);
    }

    return response.json();
}