import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';

// განვსაზღვროთ მომხმარებლის ტიპი
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
}

// კონტექსტის ტიპი
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
}

// რეგისტრაციის მონაცემების ტიპი
interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

// ვქმნით კონტექსტს
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// სატესტო მომხმარებელი
const TEST_USER: User = {
  id: '1',
  fullName: 'ტესტ მომხმარებელი',
  email: 'test@example.com',
  phone: '+995555123456',
  role: 'user'
};

// ადმინის მომხმარებელი
const ADMIN_USER: User = {
  id: '2',
  fullName: 'ადმინისტრატორი',
  email: 'admin@example.com',
  phone: '+995555654321',
  role: 'admin'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // სესიის აღდგენა გვერდის განახლების შემთხვევაში
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // შესვლის ფუნქცია
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await apiClient.login(email, password);
      
      if (response.success && response.data) {
        const { accessToken, user: userData } = response.data;
        
        // Transform backend user data to match our User interface
        const user: User = {
          id: userData.id,
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          role: userData.role || 'user'
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', accessToken);
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  // რეგისტრაციის ფუნქცია
  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await apiClient.register(userData);
      
      if (response.success && response.data) {
        // The server might return the user directly in response.data.user or just response.data
        const newUserData = response.data.user || response.data;
        
        // Transform backend user data to match our User interface
        const user: User = {
          id: newUserData.id,
          fullName: newUserData.fullName || newUserData.full_name,
          email: newUserData.email,
          phone: newUserData.phone,
          role: newUserData.role || 'user'
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Note: Registration doesn't return a token, user needs to login after registration
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Register error:', error);
      setIsLoading(false);
      // Re-throw the error so the component can handle it
      throw error;
    }
  };

  // გამოსვლის ფუნქცია
  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// კონტექსტის გამოსაყენებელი ჰუკი
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
