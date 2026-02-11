'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, 
  Search, 
  Mail, 
  Shield, 
  Save,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react'

// Types
interface SiteSettings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    contactEmail: string
    phoneNumber: string
    address: string
    timezone: string
    language: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string
    googleAnalyticsId: string
    googleSearchConsole: string
    robotsTxt: string
    sitemapEnabled: boolean
    canonicalUrls: boolean
  }
  social: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
    youtube: string
  }
  email: {
    smtpHost: string
    smtpPort: string
    smtpUser: string
    smtpPassword: string
    fromEmail: string
    fromName: string
  }
  security: {
    twoFactorAuth: boolean
    sessionTimeout: number
    maxLoginAttempts: number
    passwordPolicy: string
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    general: {
      siteName: 'Nexus Web',
      siteDescription: 'Professional web development services in Trinidad & Tobago',
      siteUrl: 'https://nexusweb.com',
      contactEmail: 'info@nexusweb.com',
      phoneNumber: '+1 (868) 123-4567',
      address: 'Port of Spain, Trinidad & Tobago',
      timezone: 'America/Port_of_Spain',
      language: 'en'
    },
    seo: {
      metaTitle: 'Nexus Web - Web Development Services Trinidad & Tobago',
      metaDescription: 'Professional web development, mobile apps, and digital solutions for Caribbean businesses. Get started with modern web technologies.',
      keywords: 'web development, trinidad, tobago, caribbean, website design, mobile apps',
      googleAnalyticsId: 'GA-123456789',
      googleSearchConsole: 'https://search.google.com/search-console',
      robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/',
      sitemapEnabled: true,
      canonicalUrls: true
    },
    social: {
      facebook: 'https://facebook.com/nexusweb',
      twitter: 'https://twitter.com/nexusweb',
      instagram: 'https://instagram.com/nexuswebtt',
      linkedin: 'https://linkedin.com/company/nexusweb',
      youtube: 'https://youtube.com/nexusweb'
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUser: 'noreply@nexusweb.com',
      smtpPassword: '',
      fromEmail: 'noreply@nexusweb.com',
      fromName: 'Nexus Web'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordPolicy: 'Strong passwords with minimum 8 characters, including uppercase, lowercase, numbers, and special characters.'
    }
  })

  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const tabs = [
    { id: 'general', label: 'General', icon: <Globe className="w-5 h-5" /> },
    { id: 'seo', label: 'SEO', icon: <Search className="w-5 h-5" /> },
    { id: 'social', label: 'Social Media', icon: <Globe className="w-5 h-5" /> },
    { id: 'email', label: 'Email', icon: <Mail className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> }
  ]

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus('idle')
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset to default values
      window.location.reload()
    }
  }

  const updateSetting = (section: keyof SiteSettings, key: string, value: unknown) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
              <p className="text-gray-600 mt-2">
                Configure your website settings and preferences
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleReset}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium flex items-center space-x-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Reset to Default</span>
              </button>
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#FF8A00] text-white px-6 py-3 rounded-lg hover:bg-[#FF6B00] transition-colors font-medium flex items-center space-x-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Save className="w-5 h-5" />
                )}
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Save Status */}
      {saveStatus !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
        >
          <div className={`rounded-lg p-4 flex items-center space-x-3 ${
            saveStatus === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {saveStatus === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            )}
            <span className="font-medium">
              {saveStatus === 'success' 
                ? 'Settings saved successfully!' 
                : 'Error saving settings. Please try again.'
              }
            </span>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-sm p-4">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#FF8A00] text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {/* General Settings */}
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">General Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
                    <input
                      type="url"
                      value={settings.general.siteUrl}
                      onChange={(e) => updateSetting('general', 'siteUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                    <textarea
                      value={settings.general.siteDescription}
                      onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) => updateSetting('general', 'contactEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={settings.general.phoneNumber}
                      onChange={(e) => updateSetting('general', 'phoneNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={settings.general.address}
                      onChange={(e) => updateSetting('general', 'address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    >
                      <option value="America/Port_of_Spain">America/Port_of_Spain</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="Europe/London">Europe/London</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={settings.general.language}
                      onChange={(e) => updateSetting('general', 'language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SEO Settings */}
            {activeTab === 'seo' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">SEO Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={settings.seo.metaTitle}
                      onChange={(e) => updateSetting('seo', 'metaTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="Enter your page title (50-60 characters recommended)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {settings.seo.metaTitle.length}/60 characters
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                    <textarea
                      value={settings.seo.metaDescription}
                      onChange={(e) => updateSetting('seo', 'metaDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="Enter your page description (150-160 characters recommended)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {settings.seo.metaDescription.length}/160 characters
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                    <input
                      type="text"
                      value={settings.seo.keywords}
                      onChange={(e) => updateSetting('seo', 'keywords', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
                      <input
                        type="text"
                        value={settings.seo.googleAnalyticsId}
                        onChange={(e) => updateSetting('seo', 'googleAnalyticsId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                        placeholder="GA-XXXXXXXXX"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Google Search Console</label>
                      <input
                        type="url"
                        value={settings.seo.googleSearchConsole}
                        onChange={(e) => updateSetting('seo', 'googleSearchConsole', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                        placeholder="https://search.google.com/search-console"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Robots.txt</label>
                    <textarea
                      value={settings.seo.robotsTxt}
                      onChange={(e) => updateSetting('seo', 'robotsTxt', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent font-mono text-sm"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sitemapEnabled"
                        checked={settings.seo.sitemapEnabled}
                        onChange={(e) => updateSetting('seo', 'sitemapEnabled', e.target.checked)}
                        className="w-4 h-4 text-[#FF8A00] border-gray-300 rounded focus:ring-[#FF8A00]"
                      />
                      <label htmlFor="sitemapEnabled" className="ml-2 text-sm text-gray-700">
                        Enable XML Sitemap
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="canonicalUrls"
                        checked={settings.seo.canonicalUrls}
                        onChange={(e) => updateSetting('seo', 'canonicalUrls', e.target.checked)}
                        className="w-4 h-4 text-[#FF8A00] border-gray-300 rounded focus:ring-[#FF8A00]"
                      />
                      <label htmlFor="canonicalUrls" className="ml-2 text-sm text-gray-700">
                        Enable Canonical URLs
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Social Media Settings */}
            {activeTab === 'social' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Social Media Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                    <input
                      type="url"
                      value={settings.social.facebook}
                      onChange={(e) => updateSetting('social', 'facebook', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
                    <input
                      type="url"
                      value={settings.social.twitter}
                      onChange={(e) => updateSetting('social', 'twitter', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                    <input
                      type="url"
                      value={settings.social.instagram}
                      onChange={(e) => updateSetting('social', 'instagram', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="https://instagram.com/yourprofile"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                    <input
                      type="url"
                      value={settings.social.linkedin}
                      onChange={(e) => updateSetting('social', 'linkedin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
                    <input
                      type="url"
                      value={settings.social.youtube}
                      onChange={(e) => updateSetting('social', 'youtube', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="https://youtube.com/yourchannel"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Email Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                    <input
                      type="text"
                      value={settings.email.smtpHost}
                      onChange={(e) => updateSetting('email', 'smtpHost', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                    <input
                      type="text"
                      value={settings.email.smtpPort}
                      onChange={(e) => updateSetting('email', 'smtpPort', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="587"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                    <input
                      type="text"
                      value={settings.email.smtpUser}
                      onChange={(e) => updateSetting('email', 'smtpUser', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                    <input
                      type="password"
                      value={settings.email.smtpPassword}
                      onChange={(e) => updateSetting('email', 'smtpPassword', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="Enter your password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                    <input
                      type="email"
                      value={settings.email.fromEmail}
                      onChange={(e) => updateSetting('email', 'fromEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="noreply@yourdomain.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                    <input
                      type="text"
                      value={settings.email.fromName}
                      onChange={(e) => updateSetting('email', 'fromName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      placeholder="Your Company Name"
                    />
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Email Configuration Note:</p>
                      <p>Make sure your SMTP credentials are correct and your email provider allows SMTP access. For Gmail, you may need to enable 2-factor authentication and generate an app password.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="twoFactorAuth"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                      className="w-4 h-4 text-[#FF8A00] border-gray-300 rounded focus:ring-[#FF8A00]"
                    />
                    <label htmlFor="twoFactorAuth" className="ml-2 text-sm text-gray-700">
                      Enable Two-Factor Authentication
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      min="5"
                      max="480"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Login Attempts</label>
                    <input
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                      min="3"
                      max="10"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
                    <textarea
                      value={settings.security.passwordPolicy}
                      onChange={(e) => updateSetting('security', 'passwordPolicy', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    />
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium mb-1">Security Recommendations:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Use strong, unique passwords for all accounts</li>
                          <li>Enable two-factor authentication when possible</li>
                          <li>Regularly review and update security settings</li>
                          <li>Monitor login attempts and suspicious activity</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
