import React, { useContext, useState } from 'react';
const AuthContext = React.createContext();

const storedToken = localStorage.getItem('accessToken');
const storedRole = localStorage.getItem('role');
const storedUserId = localStorage.getItem('userId');

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(storedToken);
    const [role, setRole] = useState(storedRole);
    const [currentUserId, setCurrentUserId] = useState(storedUserId);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken,
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
