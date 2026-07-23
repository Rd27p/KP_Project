function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-6">      
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>            
                    <input
                            className="w-full px-3 py-2 border rounded"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>  
    )
}

export default Login