import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { DecodedToken } from '../../types/types';

const useUserRoles = () => {
  const [roles, setRoles] = useState({
    isAdmin: false,
    isSuperAdmin: false,
    isUser: false,
  });

  useEffect(() => {
    
    const tokenCookie = Cookies.get('token');    
    if (tokenCookie) {
      try {
          const { accessToken } = JSON.parse(tokenCookie);
          const decodedToken = jwtDecode<DecodedToken | null>(accessToken);
          const role = decodedToken?.role ;
          
          setRoles({
            isSuperAdmin: role === 'super-admin',
            isAdmin: role === 'admin', 
            isUser: role === 'user',
          });

      } catch (error) {
          console.error('Error decoding token:', error);
      }

    } 
    
  }, []);

  return roles;
};

export default useUserRoles;
