import { useEffect } from 'react';
import { useState } from 'react';

const isAuthenticate = () => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('Auth Token');
    if (sessionToken !== null) {
      setToken(true);
    }
  }, []);

  return { token };
};

export default isAuthenticate;
