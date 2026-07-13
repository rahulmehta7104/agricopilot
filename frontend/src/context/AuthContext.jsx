import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in URL (from OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Schedule state updates asynchronously to avoid fast-refresh warnings
      setTimeout(() => {
        setToken(urlToken);
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (token) {
      // Decode token to get user info, or fetch from /api/users/me
      // For now, we'll just set a dummy user object based on token presence
      // In a real app, you might want to fetch the full profile here
      setTimeout(() => setUser({ authenticated: true }), 0);
    } else {
      setTimeout(() => setUser(null), 0);
    }
    setTimeout(() => setLoading(false), 0);
  }, [token]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token: newToken, data } = response.data;
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setUser(data);
    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
