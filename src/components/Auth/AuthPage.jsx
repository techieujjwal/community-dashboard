import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 

const AuthForm = ({ type }) => {
    const { signup, login, loading, setError } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        const success = type === 'Sign Up' 
            ? await signup(email, password) 
            : await login(email, password);
        
        setIsSubmitting(false);
        if (success) {
            setEmail('');
            setPassword('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-xl rounded-xl w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-700">{type}</h2>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="user@example.com"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="min 6 characters"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition duration-150 shadow-md hover:shadow-lg disabled:opacity-50"
                disabled={loading || isSubmitting}
            >
                {type}
            </button>
        </form>
    );
}


const AuthPage = () => {
    const { user, loading, error, logout } = useAuth();
    const [isSignUp, setIsSignUp] = useState(true);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16 font-sans">
            <div className="w-full max-w-3xl p-4">
                <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
                    CEH Authentication Module
                </h1>
                
                {error && (
                    <div className="text-center p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg mb-4 font-medium">
                        Auth Error: {error}
                    </div>
                )}

                {user ? (
                    <div className="p-8 bg-green-50 shadow-2xl rounded-xl text-center border-t-4 border-green-500">
                        <h2 className="text-2xl font-bold text-green-700 mb-4">Welcome to the Hub!</h2>
                        <p className="text-gray-600 mb-6">You are signed in as: <span className="font-semibold">{user.email}</span></p>
                        <button
                            onClick={logout}
                            className="bg-red-500 text-white py-2 px-6 rounded-lg font-bold hover:bg-red-600 transition duration-150"
                            disabled={loading}
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="mb-6 flex justify-center space-x-2 p-1 bg-gray-200 rounded-full">
                            <button
                                onClick={() => setIsSignUp(true)}
                                className={`py-2 px-6 rounded-full font-medium transition-all ${
                                    isSignUp ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => setIsSignUp(false)}
                                className={`py-2 px-6 rounded-full font-medium transition-all ${
                                    !isSignUp ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Sign In
                            </button>
                        </div>
                        
                        <AuthForm 
                            type={isSignUp ? 'Sign Up' : 'Sign In'} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthPage;