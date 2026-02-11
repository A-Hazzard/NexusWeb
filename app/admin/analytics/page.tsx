'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  FileText, 
  Briefcase,
  Activity,
  Globe
} from 'lucide-react'
import Link from 'next/link'

// Types for analytics data
type AnalyticsSummary = {
  totalViews: number;
  totalUniqueViews: number;
  blogViews: number;
  portfolioViews: number;
  period: string;
  startDate: string;
  endDate: string;
}

type TopContent = {
  entityId: string;
  views: number;
}

type ChartData = {
  date: string;
  views: number;
  uniqueViews: number;
}

type AnalyticsData = {
  summary: AnalyticsSummary;
  topContent: TopContent[] | null;
  chartData: ChartData[];
  recentAnalytics: unknown[];
}

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [selectedEntityType, setSelectedEntityType] = useState<'blog_post' | 'portfolio_project' | 'page'>('blog_post');

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await fetch(`/api/analytics?days=${selectedPeriod}&entity_type=${selectedEntityType}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setAnalyticsData(data.data);
          }
        }
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, [selectedPeriod, selectedEntityType]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF8A00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Analytics Unavailable</h1>
          <p className="text-gray-600">Unable to load analytics data.</p>
        </div>
      </div>
    );
  }

  const { summary, topContent, chartData } = analyticsData;

  // Calculate percentage changes (mock data for now)
  const blogViewsPercentage = 12.5;
  const portfolioViewsPercentage = 8.3;
  const totalViewsPercentage = 15.2;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Track your content performance and user engagement
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
              <select
                value={selectedEntityType}
                onChange={(e) => setSelectedEntityType(e.target.value as 'blog_post' | 'portfolio_project' | 'page')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
              >
                <option value="blog_post">Blog Posts</option>
                <option value="portfolio_project">Portfolio Projects</option>
                <option value="page">Pages</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{summary.totalViews.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+{totalViewsPercentage}%</span>
              <span className="text-gray-500 ml-1">from last period</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unique Views</p>
                <p className="text-2xl font-bold text-gray-900">{summary.totalUniqueViews.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+{totalViewsPercentage}%</span>
              <span className="text-gray-500 ml-1">from last period</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Blog Views</p>
                <p className="text-2xl font-bold text-gray-900">{summary.blogViews.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+{blogViewsPercentage}%</span>
              <span className="text-gray-500 ml-1">from last period</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Portfolio Views</p>
                <p className="text-2xl font-bold text-gray-900">{summary.portfolioViews.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+{portfolioViewsPercentage}%</span>
              <span className="text-gray-500 ml-1">from last period</span>
            </div>
          </motion.div>
        </div>

        {/* Charts and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Traffic Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Traffic Overview</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Page Views</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Unique Views</span>
                </div>
              </div>
            </div>
            
            {/* Simple bar chart representation */}
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.slice(-7).map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className="flex flex-col space-y-1">
                    <div 
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${(data.views / Math.max(...chartData.map(d => d.views))) * 120}px` }}
                    ></div>
                    <div 
                      className="w-8 bg-green-500 rounded-t"
                      style={{ height: `${(data.uniqueViews / Math.max(...chartData.map(d => d.uniqueViews))) * 120}px` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Content</h3>
            {topContent && topContent.length > 0 ? (
              <div className="space-y-4">
                {topContent.slice(0, 5).map((content, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">#{index + 1}</span>
                      <div className="w-2 h-2 bg-[#FF8A00] rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">{content.views} views</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No content data available</p>
            )}
          </motion.div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Portfolio project viewed</p>
                  <p className="text-xs text-gray-500">Caribbean Resort & Spa • 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Blog post viewed</p>
                  <p className="text-xs text-gray-500">Getting Started with Next.js 15 • 15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Globe className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Page view from Google</p>
                  <p className="text-xs text-gray-500">Homepage • 1 hour ago</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Performance Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average time on page</span>
                <span className="text-sm font-medium text-gray-900">2m 45s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bounce rate</span>
                <span className="text-sm font-medium text-gray-900">23%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Top referrer</span>
                <span className="text-sm font-medium text-gray-900">Google (45%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Peak traffic time</span>
                <span className="text-sm font-medium text-gray-900">2:00 PM</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/blog"
              className="inline-flex items-center px-4 py-2 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF6B00] transition-colors"
            >
              <FileText className="w-4 h-4 mr-2" />
              Manage Blog Posts
            </Link>
            <Link
              href="/admin/portfolio"
              className="inline-flex items-center px-4 py-2 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF6B00] transition-colors"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Manage Portfolio
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
