import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  membershipType: 'Free' | 'Premium';
  role: 'user' | 'provider';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isProvider: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    // User login
    if (username === 'NathanUser' && password === 'handyswift123') {
      setUser({
        username: 'NathanMonye',
        name: 'NathanMonye',
        email: 'nathan@example.com',
        phone: '+234 xxx xxx xxxx',
        photo: 'figma:asset/2a28796b137397043b571617798c141af8759769.png',
        membershipType: 'Free',
        role: 'user'
      });
      return true;
    }
    
    // Provider login
    if (username === 'provider_demo' && password === 'handyswift123') {
      setUser({
        username: 'AdebayoProvider',
        name: 'Adebayo Ogundimu',
        email: 'adebayo@handyswift.com',
        phone: '+234 801 234 5678',
        photo: 'https://images.unsplash.com/photo-1740754699699-c8b4b1635faf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYW5keW1hbiUyMHdvcmtlcnxlbnwxfHx8fDE3NjE2MDcwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        membershipType: 'Free',
        role: 'provider'
      });
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      isProvider: user?.role === 'provider'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}