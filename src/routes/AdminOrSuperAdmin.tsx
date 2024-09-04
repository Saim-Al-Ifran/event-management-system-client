import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import useUserRoles from "../hooks/auth/useCheckRoles";
import React, { ReactNode } from "react";

interface AdminOrSuperAdminProps {
    children: ReactNode;
}

const AdminOrSuperAdmin:React.FC<AdminOrSuperAdminProps > = ({ children }) => {
    const {isSuperAdmin, isAdmin } = useUserRoles();
    const isAuthenticated = Cookies.get('token');
    const location = useLocation();
    
    if (isAuthenticated && isAdmin === false && isSuperAdmin === false   ) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }
    if (isAuthenticated && (isAdmin || isSuperAdmin)) {
        return children;
    }
    return  <Navigate state={location.pathname} to="/admin/login"></Navigate>;
};

export default AdminOrSuperAdmin;