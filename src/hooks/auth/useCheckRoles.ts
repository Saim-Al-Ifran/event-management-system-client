import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useJwtDecode from './useDecode'; // Assuming this is your custom decode hook

const useUserRoles = () => {
  const [roles, setRoles] = useState({
    isAdmin: false,
    isSuperAdmin: false,
    isUser: false,
  });

  useEffect(() => {
    const tokenCookie = Cookies.get('token');

    if (tokenCookie) {
      const { decodedToken, error } = useJwtDecode(tokenCookie);

      if (error) {
        console.error('Error decoding token:', error);
        return;
      }

      const role = decodedToken?.role ;

      setRoles({
        isSuperAdmin: role === 'super-admin',
        isAdmin: role === 'admin',
        isUser: role === 'user',
      });
    }
  }, []);

  return roles;
};

export default useUserRoles;
