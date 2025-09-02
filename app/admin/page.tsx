"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function AdminDashboard() {
  const { user, loading, error, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8A00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/admin/login')}
            className="bg-[#FF8A00] text-white px-6 py-2 rounded-lg hover:bg-[#FF6B00] transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const adminModules = [
    {
      title: 'Blog Management',
      description: 'Create, edit, and manage blog posts, categories, and tags',
      icon: '📝',
      href: '/admin/blog',
      color: 'bg-blue-500',
    },
    {
      title: 'Portfolio Management',
      description: 'Manage portfolio projects, categories, and technologies',
      icon: '💼',
      href: '/admin/portfolio',
      color: 'bg-green-500',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track content performance and user engagement metrics',
      icon: '📊',
      href: '/admin/analytics',
      color: 'bg-purple-500',
    },
    {
      title: 'SEO & Performance Tools',
      description: 'Generate schema markup, analyze SEO, and optimize performance',
      icon: '🔍',
      href: '/admin/seo-tools',
      color: 'bg-orange-500',
    },
    {
      title: 'Performance Dashboard',
      description: 'Monitor Core Web Vitals and performance metrics',
      icon: '⚡',
      href: '/admin/performance',
      color: 'bg-yellow-500',
    },
    {
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions',
      icon: '👥',
      href: '/admin/users',
      color: 'bg-orange-500',
    },
    {
      title: 'Media Library',
      description: 'Upload and organize images, documents, and media files',
      icon: '🖼️',
      href: '/admin/media',
      color: 'bg-pink-500',
    },
    {
      title: 'Settings',
      description: 'Configure site settings, SEO, and preferences',
      icon: '⚙️',
      href: '/admin/settings',
      color: 'bg-gray-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Nexus Web Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{user?.profile.firstName} {user?.profile.lastName}</span>
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                  {user?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.profile.firstName}! 👋
          </h2>
          <p className="text-gray-600">
            Manage your website content, blog posts, and portfolio projects from this central dashboard.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">📝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">💼</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Portfolio Projects</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Views</p>
                <p className="text-2xl font-bold text-gray-900">2.4K</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Admin Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Admin Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminModules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Link href={module.href}>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{module.icon}</span>
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-[#FF8A00] transition-colors">
                        {module.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {module.description}
                    </p>
                    <div className="mt-4 flex items-center text-[#FF8A00] text-sm font-medium">
                      Access Module
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New blog post published: &ldquo;Getting Started with Next.js 15&rdquo;</span>
                <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Portfolio project updated: &ldquo;E-commerce Website&rdquo;</span>
                <span className="text-xs text-gray-400 ml-auto">1 day ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New user registered: &ldquo;John Doe&rdquo;</span>
                <span className="text-xs text-gray-400 ml-auto">2 days ago</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
