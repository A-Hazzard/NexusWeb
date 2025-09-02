"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/contexts/AuthContext';

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: 'in-progress' | 'completed' | 'on-hold';
  featured: boolean;
  created_at: string;
  updated_at: string;
  client_name: string;
  project_url?: string;
  github_url?: string;
}

export default function PortfolioManagement() {
  const { user, loading } = useAuth();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProjects = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });

      if (statusFilter !== 'all') {
        params.append('statusFilter', statusFilter);
      }

      const response = await fetch(`/api/portfolio/projects?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  }, [currentPage, statusFilter]);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user, currentPage, statusFilter, fetchProjects]);

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/portfolio/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProjects(projects.filter(project => project.id !== projectId));
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleStatusChange = async (projectId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/portfolio/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setProjects(projects.map(project => 
          project.id === projectId ? { ...project, status: newStatus as 'in-progress' | 'completed' | 'on-hold' } : project
        ));
      }
    } catch (error) {
      console.error('Failed to update project status:', error);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8A00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio management...</p>
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
                href="/admin"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Portfolio Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.profile.firstName} {user?.profile.lastName}
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
            <h2 className="text-3xl font-bold text-gray-900">Manage Portfolio Projects</h2>
            <p className="text-gray-600 mt-2">
              Create, edit, and manage your portfolio projects to showcase your work.
            </p>
          </div>
                            <div className="flex space-x-4">
                    <Link
                      href="/admin/portfolio/categories"
                      className="px-6 py-3 border border-[#FF8A00] text-[#FF8A00] rounded-lg hover:bg-[#FF8A00] hover:text-white transition-colors font-medium"
                    >
                      Manage Categories
                    </Link>
                    <Link
                      href="/admin/portfolio/technologies"
                      className="px-6 py-3 border border-[#FF8A00] text-[#FF8A00] rounded-lg hover:bg-[#FF8A00] hover:text-white transition-colors font-medium"
                    >
                      Manage Technologies
                    </Link>
                    <Link
                      href="/admin/portfolio/create"
                      className="bg-[#FF8A00] text-white px-6 py-3 rounded-lg hover:bg-[#FF6B00] transition-colors font-medium"
                    >
                      + New Project
                    </Link>
                  </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Projects
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, description, or client..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status Filter
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                {filteredProjects.length} of {projects.length} projects
              </div>
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
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
                {filteredProjects.map((project, index) => (
                  <motion.tr
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {project.title.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {project.title}
                            {project.featured && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.client_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={project.status}
                        onChange={(e) => handleStatusChange(project.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-[#FF8A00] focus:outline-none ${
                          project.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : project.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="on-hold">On Hold</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(project.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/portfolio/edit/${project.id}`}
                          className="text-[#FF8A00] hover:text-[#FF6B00] transition-colors"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/portfolio/${project.slug}`}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
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
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🎨</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by creating your first portfolio project'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link
                  href="/admin/portfolio/create"
                  className="bg-[#FF8A00] text-white px-6 py-3 rounded-lg hover:bg-[#FF6B00] transition-colors font-medium"
                >
                  Create Your First Project
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === page
                      ? 'bg-[#FF8A00] text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </main>
    </div>
  );
}
