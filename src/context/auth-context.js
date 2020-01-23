import React, { useContext, useState } from 'react';
const AuthContext = React.createContext();

const storedToken = localStorage.getItem('token');
const storedRole = localStorage.getItem('role');
const storedUserId = localStorage.getItem('userId');

export function AuthProvider({ children }) {
    const [token, setToken] = useState(storedToken);
    const [role, setRole] = useState(storedRole);
    const [currentUserId, setCurrentUserId] = useState(storedUserId);

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                role,
                setRole,
                currentUserId,
                setCurrentUserId
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
