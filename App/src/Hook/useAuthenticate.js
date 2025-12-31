import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../firebase";

const useAuthenticate = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async () => {
      const token = await auth.currentUser.getIdToken();
      setToken(token);
    };
  }, []);

  return { token };
};

export default useAuthenticate;
