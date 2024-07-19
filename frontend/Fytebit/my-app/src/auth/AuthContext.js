import React, { createContext, useState, useContext, useEffect } from 'react';
import { checkJWTAuth } from '../api/Client';
import BaseUrlContext from "../api/BaseUrlContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const baseUrl = useContext(BaseUrlContext);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                checkJWTAuth(baseUrl, token)
                    .then(data => {
                        if (data.authenticated) {
                            setUser(data.user);
                        }
                    })
                    .catch(error => {
                        console.error('Error checking authentication:', error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }

    };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);