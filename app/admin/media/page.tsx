'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  Upload, 
  Image as ImageIcon, 
  File, 
  Search, 
  Grid3X3, 
  List, 
  Download,
  Edit,
  Eye,
  FolderPlus
} from 'lucide-react'

// Types
interface MediaItem {
  id: string
  name: string
  type: 'image' | 'document' | 'video' | 'audio'
  url: string
  thumbnail?: string
  size: number
  dimensions?: { width: number; height: number }
  mimeType: string
  tags: string[]
  category: string
  uploadedBy: string
  uploadedAt: Date
  usageCount: number
}

interface MediaCategory {
  id: string
  name: string
  count: number
  color: string
}

export default function MediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [categories, setCategories] = useState<MediaCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // Mock media data
  useEffect(() => {
    const mockCategories: MediaCategory[] = [
      { id: '1', name: 'Blog Images', count: 24, color: 'bg-blue-500' },
      { id: '2', name: 'Portfolio', count: 18, color: 'bg-green-500' },
      { id: '3', name: 'Logos', count: 8, color: 'bg-purple-500' },
      { id: '4', name: 'Documents', count: 12, color: 'bg-orange-500' },
      { id: '5', name: 'Videos', count: 6, color: 'bg-red-500' }
    ]

    const mockMedia: MediaItem[] = [
      {
        id: '1',
        name: 'hero-image.jpg',
        type: 'image',
        url: 'https://picsum.photos/800/600?random=1',
        thumbnail: 'https://picsum.photos/200/150?random=1',
        size: 245760,
        dimensions: { width: 800, height: 600 },
        mimeType: 'image/jpeg',
        tags: ['hero', 'landing', 'main'],
        category: 'Blog Images',
        uploadedBy: 'John Doe',
        uploadedAt: new Date('2024-01-15'),
        usageCount: 3
      },
      {
        id: '2',
        name: 'portfolio-project-1.png',
        type: 'image',
        url: 'https://picsum.photos/800/600?random=2',
        thumbnail: 'https://picsum.photos/200/150?random=2',
        size: 512000,
        dimensions: { width: 1200, height: 800 },
        mimeType: 'image/png',
        tags: ['portfolio', 'web-design', 'ecommerce'],
        category: 'Portfolio',
        uploadedBy: 'Jane Smith',
        uploadedAt: new Date('2024-01-14'),
        usageCount: 1
      },
      {
        id: '3',
        name: 'company-logo.svg',
        type: 'image',
        url: '/logo.svg',
        thumbnail: '/logo.svg',
        size: 15360,
        dimensions: { width: 200, height: 60 },
        mimeType: 'image/svg+xml',
        tags: ['logo', 'brand', 'company'],
        category: 'Logos',
        uploadedBy: 'Admin',
        uploadedAt: new Date('2024-01-10'),
        usageCount: 15
      },
      {
        id: '4',
        name: 'case-study-report.pdf',
        type: 'document',
        url: '/documents/case-study.pdf',
        size: 2048000,
        mimeType: 'application/pdf',
        tags: ['case-study', 'report', 'pdf'],
        category: 'Documents',
        uploadedBy: 'Mike Johnson',
        uploadedAt: new Date('2024-01-12'),
        usageCount: 2
      },
      {
        id: '5',
        name: 'product-demo.mp4',
        type: 'video',
        url: '/videos/demo.mp4',
        thumbnail: 'https://picsum.photos/200/150?random=3',
        size: 15728640,
        dimensions: { width: 1920, height: 1080 },
        mimeType: 'video/mp4',
        tags: ['demo', 'product', 'video'],
        category: 'Videos',
        uploadedBy: 'Sarah Wilson',
        uploadedAt: new Date('2024-01-13'),
        usageCount: 8
      }
    ]

    setTimeout(() => {
      setCategories(mockCategories)
      setMediaItems(mockMedia)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesType = selectedType === 'all' || item.type === selectedType
    
    return matchesSearch && matchesCategory && matchesType
  })

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-8 h-8 text-blue-500" />
      case 'document':
        return <File className="w-8 h-8 text-orange-500" />
      case 'video':
        return <File className="w-8 h-8 text-red-500" />
      case 'audio':
        return <File className="w-8 h-8 text-red-500" />
      default:
        return <File className="w-8 h-8 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleFileUpload = (files: FileList) => {
    // Mock file upload
    const newItems: MediaItem[] = Array.from(files).map((file, index) => ({
      id: Date.now().toString() + index,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 
            file.type.startsWith('video/') ? 'video' : 
            file.type.startsWith('audio/') ? 'audio' : 'document',
      url: URL.createObjectURL(file),
      thumbnail: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      size: file.size,
      mimeType: file.type,
      tags: [],
      category: 'Uncategorized',
      uploadedBy: 'Current User',
      uploadedAt: new Date(),
      usageCount: 0
    }))

    setMediaItems([...mediaItems, ...newItems])
    setShowUploadModal(false)
  }

  const handleDeleteItems = () => {
    if (confirm(`Are you sure you want to delete ${selectedItems.length} item(s)?`)) {
      setMediaItems(mediaItems.filter(item => !selectedItems.includes(item.id)))
      setSelectedItems([])
    }
  }

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleSelectAll = () => {
    if (selectedItems.length === filteredMedia.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredMedia.map(item => item.id))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8A00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading media library...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
              <p className="text-gray-600 mt-2">
                Upload, organize, and manage your media files
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCreateFolderModal(true)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium flex items-center space-x-2"
              >
                <FolderPlus className="w-5 h-5" />
                <span>New Folder</span>
              </button>
              
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-[#FF8A00] text-white px-6 py-3 rounded-lg hover:bg-[#FF6B00] transition-colors font-medium flex items-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Files</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="document">Documents</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-[#FF8A00] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-[#FF8A00] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedType('all')
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </motion.div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-blue-800 font-medium">
                  {selectedItems.length} item(s) selected
                </span>
                <button
                  onClick={handleSelectAll}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {selectedItems.length === filteredMedia.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded border border-blue-300 hover:bg-blue-100">
                  Download
                </button>
                <button className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded border border-blue-300 hover:bg-blue-100">
                  Move
                </button>
                <button
                  onClick={handleDeleteItems}
                  className="text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-300 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Media Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className={`relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                    selectedItems.includes(item.id) 
                      ? 'border-[#FF8A00] bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSelectItem(item.id)}
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2 z-10">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="w-4 h-4 text-[#FF8A00] border-gray-300 rounded focus:ring-[#FF8A00]"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  {/* Thumbnail */}
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getFileIcon(item.type)
                    )}
                  </div>

                  {/* File Info */}
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900 truncate" title={item.name}>
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatFileSize(item.size)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500 capitalize">{item.type}</span>
                      <span className="text-xs text-gray-400">{item.usageCount} uses</span>
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                        <Eye className="w-4 h-4 text-gray-700" />
                      </button>
                      <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                        <Download className="w-4 h-4 text-gray-700" />
                      </button>
                      <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                        <Edit className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === filteredMedia.length}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-[#FF8A00] border-gray-300 rounded focus:ring-[#FF8A00]"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMedia.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="w-4 h-4 text-[#FF8A00] border-gray-300 rounded focus:ring-[#FF8A00]"
                        />
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {item.thumbnail ? (
                              <Image
                                src={item.thumbnail}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                                {getFileIcon(item.type)}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.uploadedBy}</div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="capitalize text-sm text-gray-900">{item.type}</span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatFileSize(item.size)}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          {item.category}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.uploadedAt.toLocaleDateString()}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-[#FF8A00] hover:text-[#FF6B00]">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-[#FF8A00] hover:text-[#FF6B00]">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="text-[#FF8A00] hover:text-[#FF6B00]">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                  <span className="text-sm text-gray-500">{category.count} files</span>
                </div>
                <h4 className="font-medium text-gray-900">{category.name}</h4>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Files</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Drag and drop files here, or click to select
              </p>
              
              <input
                type="file"
                multiple
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              
              <label
                htmlFor="file-upload"
                className="bg-[#FF8A00] text-white px-6 py-2 rounded-lg hover:bg-[#FF6B00] transition-colors cursor-pointer"
              >
                Select Files
              </label>
            </div>
            
            <div className="flex items-center justify-end mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Folder Modal */}
      {showCreateFolderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Folder</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const folderName = formData.get('folderName') as string
              
              // Mock folder creation
              const newCategory: MediaCategory = {
                id: Date.now().toString(),
                name: folderName,
                count: 0,
                color: 'bg-gray-500'
              }
              
              setCategories([...categories, newCategory])
              setShowCreateFolderModal(false)
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Folder Name</label>
                  <input
                    type="text"
                    name="folderName"
                    required
                    placeholder="Enter folder name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateFolderModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF8A00] text-white px-4 py-2 rounded-lg hover:bg-[#FF6B00] transition-colors"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
