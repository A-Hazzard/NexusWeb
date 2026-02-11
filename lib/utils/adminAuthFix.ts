// This file contains the common patterns to replace in admin pages
// to fix the React Hook dependency warnings and use the new auth system

export const OLD_AUTH_IMPORTS = [
  'import { useState, useEffect } from \'react\';',
  'import { useRouter } from \'next/navigation\';',
  'import Link from \'next/link\';',
  'import { motion } from \'framer-motion\';',
];

export const NEW_AUTH_IMPORTS = [
  'import { useState, useEffect } from \'react\';',
  'import { useRouter } from \'next/navigation\';',
  'import Link from \'next/link\';',
  'import { motion } from \'framer-motion\';',
  'import { useAuth } from \'@/lib/contexts/AuthContext\';',
];

export const OLD_USER_INTERFACE = `interface User {
  id: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
}`;

export const OLD_AUTH_STATE = `const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);`;

export const NEW_AUTH_STATE = `const { user, loading, error } = useAuth();`;

export const OLD_CHECK_AUTH_USE_EFFECT = `useEffect(() => {
    checkAuth();
  }, []);`;

export const OLD_CHECK_AUTH_FUNCTION = `const checkAuth = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      // Verify token with backend
      const response = await fetch('/api/auth/verify', {
        headers: {
          'Authorization': \`Bearer \${token}\`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        return;
      }

      const userData = await response.json();
      setUser(userData.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };`;

export const OLD_LOGOUT_FUNCTION = `const handleLogout = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': \`Bearer \${token}\`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('admin_token');
      router.push('/admin/login');
    }
  };`;

export const NEW_LOGOUT_FUNCTION = `const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };`;

export const OLD_USER_REFERENCES = [
  'user.first_name',
  'user.last_name',
  'user.role',
  'user.email',
];

export const NEW_USER_REFERENCES = [
  'user?.profile.firstName',
  'user?.profile.lastName',
  'user?.role',
  'user?.email',
];
