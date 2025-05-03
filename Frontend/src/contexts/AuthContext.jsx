import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await fetchUserProfile();
        } catch (error) {
          console.error('Error during auth initialization:', error);
          handleLogout();
        }
      }
      setLoading(false);
    };
    
    initializeAuth();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      if (response.data) {
        setUser(response.data);
        return response.data;
      }
      throw new Error('User profile not found');
    } catch (error) {
      console.error('Error fetching user profile:', error);
      handleLogout();
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      setUser(userData);
      
      // Update axios default headers
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      toast.success('Login successful!');
      navigate('/');
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      handleLogout();
      toast.error(error.response?.data?.message || 'Login failed');
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.success) {
        toast.success('Registration successful! Please log in.');
        navigate('/login');
        return { success: true };
      }
      throw new Error('Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const checkRole = (requiredRole) => {
    return user && user.role === requiredRole;
  };

  const value = {
    user,
    loading,
    login,
    logout: handleLogout,
    register,
    checkRole,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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