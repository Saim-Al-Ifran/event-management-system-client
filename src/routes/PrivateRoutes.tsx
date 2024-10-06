import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

interface userProps  {
    children: ReactNode;
}

const PrivateRoutes:React.FC<userProps > = ({ children }) => {
   
    const getUser = useSelector((state: any) => state.auth);
    const isUser = getUser?.user?.role === 'user';
    console.log(getUser);
    
    const isAuthenticated = Cookies.get('token');
    const location = useLocation();
 
    if (isAuthenticated && isUser === false  ) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    if (!isUser) {
        return <Navigate to="/" />;
      }
    

    if (isAuthenticated && isUser) {
        return children;
    }
    return  <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoutes;