import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './components/Auth/AuthPage';

const App = () => {
    return (
        <AuthProvider>
            <AuthPage />
        </AuthProvider>
    );
};

export default App;