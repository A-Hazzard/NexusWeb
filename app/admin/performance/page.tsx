'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Gauge, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  Upload,
  Database
} from 'lucide-react'

// Types
interface PerformanceMetric {
  name: string
  value: number
  unit: string
  status: 'good' | 'needs-improvement' | 'poor'
  target: number
}

interface CoreWebVital {
  metric: string
  value: number
  status: 'good' | 'needs-improvement' | 'poor'
  description: string
}

interface PerformanceReport {
  overallScore: number
  coreWebVitals: CoreWebVital[]
  metrics: PerformanceMetric[]
  recommendations: string[]
  lastUpdated: Date
}

export default function PerformancePage() {
  const [performanceReport, setPerformanceReport] = useState<PerformanceReport | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')

  // Mock performance data
  useEffect(() => {
    const mockReport: PerformanceReport = {
      overallScore: 87,
      coreWebVitals: [
        {
          metric: 'Largest Contentful Paint (LCP)',
          value: 2.1,
          status: 'good',
          description: 'Time for the largest content element to become visible'
        },
        {
          metric: 'First Input Delay (FID)',
          value: 45,
          status: 'good',
          description: 'Time from first interaction to response'
        },
        {
          metric: 'Cumulative Layout Shift (CLS)',
          value: 0.08,
          status: 'good',
          description: 'Measure of visual stability'
        },
        {
          metric: 'First Contentful Paint (FCP)',
          value: 1.2,
          status: 'good',
          description: 'Time for first content to be painted'
        }
      ],
      metrics: [
        {
          name: 'Page Load Time',
          value: 1.8,
          unit: 's',
          status: 'good',
          target: 2.0
        },
        {
          name: 'Time to Interactive',
          value: 2.3,
          unit: 's',
          status: 'good',
          target: 3.0
        },
        {
          name: 'Total Blocking Time',
          value: 120,
          unit: 'ms',
          status: 'needs-improvement',
          target: 200
        },
        {
          name: 'Speed Index',
          value: 1.5,
          unit: 's',
          status: 'good',
          target: 2.0
        }
      ],
      recommendations: [
        'Optimize images using WebP format and proper sizing',
        'Implement lazy loading for below-the-fold images',
        'Minimize render-blocking resources',
        'Enable text compression (gzip)',
        'Leverage browser caching for static assets'
      ],
      lastUpdated: new Date()
    }

    setTimeout(() => {
      setPerformanceReport(mockReport)
      setIsLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-100'
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-100'
      case 'poor':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'needs-improvement':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'poor':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <Info className="w-5 h-5 text-gray-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8A00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading performance data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Performance Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Monitor Core Web Vitals and performance metrics
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
              >
                <option value="1d">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              
              <button className="bg-[#FF8A00] text-white px-4 py-2 rounded-lg hover:bg-[#FF6B00] transition-colors">
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Performance Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Overall Performance Score</h2>
            <div className="text-6xl font-bold mb-2">{performanceReport?.overallScore || 0}/100</div>
            <p className="text-lg opacity-90">
              {(performanceReport?.overallScore || 0) >= 90 ? 'Excellent' : 
               (performanceReport?.overallScore || 0) >= 70 ? 'Good' : 
               (performanceReport?.overallScore || 0) >= 50 ? 'Needs Improvement' : 'Poor'}
            </p>
            <p className="text-sm opacity-75 mt-2">
              Last updated: {performanceReport?.lastUpdated?.toLocaleString() || 'Never'}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Core Web Vitals */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Gauge className="w-6 h-6 text-[#FF8A00] mr-2" />
              Core Web Vitals
            </h3>
            
            <div className="space-y-4">
              {performanceReport?.coreWebVitals.map((vital, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{vital.metric}</h4>
                    {getStatusIcon(vital.status)}
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-[#FF8A00]">
                      {vital.value}
                      {vital.metric.includes('CLS') ? '' : vital.metric.includes('FID') ? 'ms' : 's'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vital.status)}`}>
                      {vital.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">{vital.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="w-6 h-6 text-[#FF8A00] mr-2" />
              Performance Metrics
            </h3>
            
            <div className="space-y-4">
              {performanceReport?.metrics.map((metric, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{metric.name}</h4>
                    {getStatusIcon(metric.status)}
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-[#FF8A00]">
                      {metric.value}{metric.unit}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                      {metric.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Target: {metric.target}{metric.unit}</span>
                    <span className={metric.value <= metric.target ? 'text-green-600' : 'text-red-600'}>
                      {metric.value <= metric.target ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Zap className="w-6 h-6 text-[#FF8A00] mr-2" />
            Optimization Recommendations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {performanceReport?.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-700">{rec}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 text-[#FF8A00] mr-2" />
            Performance Trends
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">+12%</div>
              <div className="text-sm text-blue-800">LCP Improvement</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">-25%</div>
              <div className="text-sm text-green-800">Load Time Reduction</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">+8%</div>
              <div className="text-sm text-purple-800">Core Web Vitals Score</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">-15%</div>
              <div className="text-sm text-orange-800">Bounce Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:border-[#FF8A00] hover:bg-orange-50 transition-colors">
              <Download className="w-5 h-5 text-[#FF8A00]" />
              <span>Export Report</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:border-[#FF8A00] hover:bg-orange-50 transition-colors">
              <Upload className="w-5 h-5 text-[#FF8A00]" />
              <span>Run Test</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:border-[#FF8A00] hover:bg-orange-50 transition-colors">
              <Database className="w-5 h-5 text-[#FF8A00]" />
              <span>View History</span>
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
