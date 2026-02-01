import { createContext, useState, useEffect } from "react";
import { getToken, setToken as setLocalToken, removeToken as removeLocalToken } from "../utils/token";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setTokenState] = useState(getToken());
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

    // Sync state with local storage on mount
    useEffect(() => {
        const storedToken = getToken();
        if (storedToken) {
            setTokenState(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (newToken) => {
        setLocalToken(newToken);
        setTokenState(newToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeLocalToken();
        setTokenState(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
