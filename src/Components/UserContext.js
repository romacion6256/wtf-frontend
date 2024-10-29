// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for user data
        const storedUser = localStorage.getItem("user");
        console.log("Stored User: ", storedUser); // Debug: log stored user
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log("Parsed User: ", parsedUser); // Debug: log parsed user
            setUser(parsedUser);
        }
        setLoading(false);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return React.useContext(UserContext);
};
