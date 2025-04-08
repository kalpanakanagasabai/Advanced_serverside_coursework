import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null });

  const loginUser = (token) => setAuth({ token });
  const logoutUser = () => setAuth({ token: null });

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

