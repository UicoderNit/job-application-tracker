import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchMe, loginUser, registerUser } from '../api/auth.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem('job-tracker-token');
      if (!token) {
        setInitializing(false);
        return;
      }

      try {
        const data = await fetchMe();
        setUser(data.user);
      } catch {
        localStorage.removeItem('job-tracker-token');
      } finally {
        setInitializing(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (payload) => {
    const data = await loginUser(payload);
    localStorage.setItem('job-tracker-token', data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    localStorage.setItem('job-tracker-token', data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('job-tracker-token');
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, initializing, login, register, logout, isAuthenticated: Boolean(user) }),
    [user, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
