import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from '../../types/types';
  
const useJwtDecode = (token:string) => {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded  = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (err) {
        setError('Invalid token');
      }
    }
  }, [token]);

  return { decodedToken, error };
};

export default useJwtDecode;