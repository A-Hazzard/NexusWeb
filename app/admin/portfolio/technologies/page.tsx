"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/contexts/AuthContext';

interface PortfolioTechnology {
  id: string;
  name: string;
  slug: string;
  color: string;
  created_at: string;
  project_count?: number;
}

interface FormData {
  name: string;
  slug: string;
  color: string;
}

export default function PortfolioTechnologyManagement() {
  const { user } = useAuth();
  const [technologies, setTechnologies] = useState<PortfolioTechnology[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState<PortfolioTechnology | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    color: '#10B981',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTechnologies = useCallback(async () => {
    try {
      const response = await fetch('/api/portfolio/technologies');
      if (response.ok) {
        const data = await response.json();
        setTechnologies(data.technologies || []);
      }
    } catch (error) {
      console.error('Failed to fetch technologies:', error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchTechnologies();
    }
  }, [user, fetchTechnologies]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('admin_token');
      const url = editingTechnology 
        ? `/api/portfolio/technologies/${editingTechnology.id}`
        : '/api/portfolio/technologies';
      
      const method = editingTechnology ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save technology');
      }

      // Reset form and refresh technologies
      setFormData({ name: '', slug: '', color: '#10B981' });
      setShowCreateForm(false);
      setEditingTechnology(null);
      await fetchTechnologies();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (technology: PortfolioTechnology) => {
    setEditingTechnology(technology);
    setFormData({
      name: technology.name,
      slug: technology.slug,
      color: technology.color,
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (technologyId: string) => {
    if (!confirm('Are you sure you want to delete this technology? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/portfolio/technologies/${technologyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete technology');
      }

      await fetchTechnologies();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', slug: '', color: '#10B981' });
    setShowCreateForm(false);
    setEditingTechnology(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/admin/portfolio" className="text-gray-500 hover:text-gray-700 mr-4">
                ← Back to Portfolio
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Manage Portfolio Technologies</h1>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/admin/portfolio"
                className="px-6 py-3 border border-[#FF8A00] text-[#FF8A00] rounded-lg hover:bg-[#FF8A00] hover:text-white transition-colors font-medium"
              >
                Back to Portfolio
              </Link>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-[#FF8A00] text-white px-6 py-3 rounded-lg hover:bg-[#FF6B00] transition-colors font-medium"
              >
                + New Technology
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create/Edit Form */}
        {(showCreateForm || editingTechnology) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow p-6 mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {editingTechnology ? 'Edit Technology' : 'Create New Technology'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Technology Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                    Color *
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="#10B981"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#FF8A00] text-white px-6 py-3 rounded-lg hover:bg-[#FF6B00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : editingTechnology ? 'Update Technology' : 'Create Technology'}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
            </form>
          </motion.div>
        )}

        {/* Technologies Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technology
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projects
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {technologies.map((technology, index) => (
                  <motion.tr
                    key={technology.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: technology.color }}
                        ></div>
                        <div className="text-sm font-medium text-gray-900">
                          {technology.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {technology.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {technology.project_count || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(technology.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(technology)}
                          className="text-[#FF8A00] hover:text-[#FF6B00] transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(technology.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {technologies.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">⚡</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No technologies yet</h3>
              <p className="text-gray-500 mb-6">
                Create your first portfolio technology to start categorizing your projects.
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-[#FF8A00] text-white px-6 py-3 rounded-lg hover:bg-[#FF6B00] transition-colors font-medium"
              >
                Create Technology
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
