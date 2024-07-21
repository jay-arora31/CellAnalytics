// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to="/auth/login" />;
    }

    return children;
};

export default ProtectedRoute;
