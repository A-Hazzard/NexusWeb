"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';

interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
}

interface PortfolioTechnology {
  id: string;
  name: string;
  slug: string;
  color: string;
}

interface FormData {
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  client_name: string;
  project_url: string;
  status: 'in-progress' | 'completed' | 'on-hold';
  featured: boolean;
  start_date: string;
  end_date: string;
  technologies: string[];
  categories: string[];
  featured_image: string;
  gallery_images: string[];
  meta_title: string;
  meta_description: string;
}

export default function CreatePortfolioProject() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    excerpt: '',
    description: '',
    client_name: '',
    project_url: '',
    status: 'in-progress',
    featured: false,
    start_date: '',
    end_date: '',
    technologies: [],
    categories: [],
    featured_image: '',
    gallery_images: [],
    meta_title: '',
    meta_description: '',
  });

  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [technologies, setTechnologies] = useState<PortfolioTechnology[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/portfolio/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, []);

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
      fetchCategories();
      fetchTechnologies();
    }
  }, [user, fetchCategories, fetchTechnologies]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      meta_title: title ? `${title} - Nexus Web Portfolio` : '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/portfolio/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          start_date: formData.start_date ? new Date(formData.start_date).toISOString() : null,
          end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create project');
      }

      router.push('/admin/portfolio');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addTechnology = (techId: string) => {
    if (!formData.technologies.includes(techId)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techId],
      }));
    }
  };

  const removeTechnology = (techId: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(id => id !== techId),
    }));
  };

  const addCategory = (categoryId: string) => {
    if (!formData.categories.includes(categoryId)) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, categoryId],
      }));
    }
  };

  const removeCategory = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(id => id !== categoryId),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-gray-500 hover:text-gray-700 mr-4">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Create Portfolio Project</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
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
                <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="project_url" className="block text-sm font-medium text-gray-700 mb-2">
                  Project URL
                </label>
                <input
                  type="url"
                  id="project_url"
                  value={formData.project_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, project_url: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Content</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Short Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  placeholder="Brief description of the project (appears in portfolio grid)"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  placeholder="Detailed description of the project, challenges, solutions, and results"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  You can use Markdown formatting for rich content
                </p>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Status *
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'in-progress' | 'completed' | 'on-hold' }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                >
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                </select>
              </div>

              <div>
                <label htmlFor="featured" className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="h-4 w-4 text-[#FF8A00] focus:ring-[#FF8A00] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Featured Project</span>
                </label>
              </div>

              <div>
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start_date"
                  value={formData.start_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  id="end_date"
                  value={formData.end_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Categories and Technologies */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Categories & Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            addCategory(category.id);
                          } else {
                            removeCategory(category.id);
                          }
                        }}
                        className="h-4 w-4 text-[#FF8A00] focus:ring-[#FF8A00] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Technologies</h3>
                <div className="space-y-3">
                  {technologies.map((tech) => (
                    <label key={tech.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.technologies.includes(tech.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            addTechnology(tech.id);
                          } else {
                            removeTechnology(tech.id);
                          }
                        }}
                        className="h-4 w-4 text-[#FF8A00] focus:ring-[#FF8A00] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{tech.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Images</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL *
                </label>
                <input
                  type="url"
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label htmlFor="gallery_images" className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Images (one per line)
                </label>
                <textarea
                  id="gallery_images"
                  value={formData.gallery_images.join('\n')}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    gallery_images: e.target.value.split('\n').filter(url => url.trim()) 
                  }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  placeholder="https://example.com/image1.jpg\nhttps://example.com/image2.jpg"
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">SEO Settings</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  placeholder="SEO title for search engines"
                />
              </div>

              <div>
                <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  placeholder="Brief description for search engine results"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/portfolio"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF8A00] text-white px-6 py-3 rounded-lg hover:bg-[#FF6B00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
