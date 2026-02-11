"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/contexts/AuthContext';

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  created_at: string;
  post_count: number;
}

export default function CategoryManagement() {
  const { user, loading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    color: '#3B82F6',
  });

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/blog/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user, fetchCategories]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      color: '#3B82F6',
    });
    setEditingCategory(null);
    setShowCreateForm(false);
  };

  const handleCreate = () => {
    setShowCreateForm(true);
    setEditingCategory(null);
    resetForm();
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowCreateForm(false);
    setFormData({
      name: category.name,
      slug: category.slug,
      color: category.color,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('admin_token');
      const url = editingCategory 
        ? `/api/blog/categories/${editingCategory.id}`
        : '/api/blog/categories';
      
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const message = editingCategory ? 'Category updated successfully!' : 'Category created successfully!';
        alert(message);
        resetForm();
        fetchCategories();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('Failed to save category. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/blog/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Category deleted successfully!');
        fetchCategories();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete category. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8A00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/blog"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.profile.firstName} {user?.profile.lastName}
              </span>
              <Link
                href="/admin"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Blog Categories</h2>
            <p className="mt-2 text-gray-600">
              Manage your blog categories to organize your content effectively.
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF6B00] transition-colors font-medium"
          >
            Add Category
          </button>
        </div>

        {/* Create/Edit Form */}
        {(showCreateForm || editingCategory) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow p-6 mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    placeholder="Enter category name..."
                    required
                  />
                </div>

                {/* Slug */}
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
                    placeholder="url-slug"
                    required
                  />
                </div>

                {/* Color */}
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent font-mono text-sm"
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF6B00] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : (editingCategory ? 'Update Category' : 'Create Category')}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Categories Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posts
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
                {categories.map((category, index) => (
                  <motion.tr
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <div className="text-sm font-medium text-gray-900">
                          {category.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {category.post_count || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(category.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-[#FF8A00] hover:text-[#FF6B00] transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
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
          {categories.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first category.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleCreate}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF8A00] hover:bg-[#FF6B00] transition-colors"
                >
                  Add Category
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
