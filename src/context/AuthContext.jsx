import React, { useState, useEffect, useContext, createContext } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; 

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            setError(null);
        });
        return () => unsubscribe();
    }, []);

    const signup = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            return true;
        } catch (err) {
            const errorMessage = err.message.replace('Firebase: Error (auth/', '').replace(').', '');
            setError(errorMessage);
            setLoading(false);
            return false;
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (err) {
            const errorMessage = err.message.replace('Firebase: Error (auth/', '').replace(').', '');
            setError(errorMessage);
            setLoading(false);
            return false;
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await signOut(auth);
        } catch (err) {
            setError('Sign out failed.');
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        signup,
        login,
        logout,
        setError
    };

    if (loading) {
         return (
             <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                 <p className="text-xl text-indigo-600 font-semibold">Checking session...</p>
             </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};