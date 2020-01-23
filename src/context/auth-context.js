import React, { useContext, useState } from 'react';
const AuthContext = React.createContext();

const storedRole = localStorage.getItem('role');
const storedUserId = localStorage.getItem('userId');

export function AuthProvider({ children }) {
    const [role, setRole] = useState(storedRole);
    const [currentUserId, setCurrentUserId] = useState(storedUserId);

    return (
        <AuthContext.Provider
            value={{
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
