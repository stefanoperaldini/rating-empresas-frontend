import React, { useContext, useState } from 'react';
import jwt from "jsonwebtoken";

const AuthContext = React.createContext();

const storedUser = JSON.parse(localStorage.getItem('currentUser'));

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(storedUser);

    let userData = null;
    if (storedUser) {
        userData = jwt.decode(storedUser.accessToken);
    }

    const [accessToken, setAccessToken] = useState(storedUser && storedUser.accessToken);
    const [role, setRole] = useState(userData && userData.role);
    const [currentUserId, setCurrentUserId] = useState(userData && userData.userId);


    return (
        <AuthContext.Provider
            value={{
                currentUser,
                setCurrentUser,
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
