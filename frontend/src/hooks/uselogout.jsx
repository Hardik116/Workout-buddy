// src/hooks/uselogout.jsx
import { useauthcontext } from "./useauthcontext";

const uselogout = () => {
  const { dispatch } = useauthcontext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};

export default uselogout; // Correct default export
