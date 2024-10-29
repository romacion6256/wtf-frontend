// AuthenticatedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import your context

const AuthenticatedRoute = ({ element, roles }) => {
    const { user } = useUser();

    console.log("AuthenticatedRoute user:", user); // Debug

    if (!user) {
        console.log("User is not logged in, redirecting to login");
        return <Navigate to="/login" replace />;
    }

    if (roles && roles.length > 0 && !roles.includes(user.role)) {
        console.log("User role not authorized, redirecting to home");
        return <Navigate to="/" replace />;
    }

    console.log("User is authorized, rendering the element");
    return element;
};

export default AuthenticatedRoute;
