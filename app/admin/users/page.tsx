'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Shield, 
  Calendar,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react'

// Types
interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'inactive' | 'suspended'
  last_login: Date | null
  created_at: Date
  permissions: string[]
}

interface UserFormData {
  email: string
  first_name: string
  last_name: string
  role: 'admin' | 'editor' | 'viewer'
  password: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Mock users data
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'admin@nexusweb.com',
        first_name: 'John',
        last_name: 'Doe',
        role: 'admin',
        status: 'active',
        last_login: new Date('2024-01-15T10:30:00'),
        created_at: new Date('2023-06-01'),
        permissions: ['all']
      },
      {
        id: '2',
        email: 'editor@nexusweb.com',
        first_name: 'Jane',
        last_name: 'Smith',
        role: 'editor',
        status: 'active',
        last_login: new Date('2024-01-14T15:45:00'),
        created_at: new Date('2023-08-15'),
        permissions: ['blog:write', 'portfolio:write', 'analytics:read']
      },
      {
        id: '3',
        email: 'viewer@nexusweb.com',
        first_name: 'Mike',
        last_name: 'Johnson',
        role: 'viewer',
        status: 'active',
        last_login: new Date('2024-01-13T09:20:00'),
        created_at: new Date('2023-10-01'),
        permissions: ['analytics:read']
      },
      {
        id: '4',
        email: 'suspended@nexusweb.com',
        first_name: 'Sarah',
        last_name: 'Wilson',
        role: 'editor',
        status: 'suspended',
        last_login: new Date('2024-01-10T14:15:00'),
        created_at: new Date('2023-09-01'),
        permissions: ['blog:read']
      }
    ]

    setTimeout(() => {
      setUsers(mockUsers)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'editor':
        return 'bg-blue-100 text-blue-800'
      case 'viewer':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'inactive':
        return <XCircle className="w-4 h-4 text-gray-500" />
      case 'suspended':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <XCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const handleCreateUser = (userData: UserFormData) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      status: 'active',
      last_login: null,
      created_at: new Date(),
      permissions: getDefaultPermissions(userData.role)
    }
    
    setUsers([...users, newUser])
    setShowCreateModal(false)
  }

  const handleEditUser = (userData: Partial<User>) => {
    if (editingUser) {
      const updatedUsers = users.map(user => 
        user.id === editingUser.id ? { ...user, ...userData } : user
      )
      setUsers(updatedUsers)
      setShowEditModal(false)
      setEditingUser(null)
    }
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  const handleStatusChange = (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    )
    setUsers(updatedUsers)
  }

  const getDefaultPermissions = (role: string): string[] => {
    switch (role) {
      case 'admin':
        return ['all']
      case 'editor':
        return ['blog:write', 'portfolio:write', 'analytics:read']
      case 'viewer':
        return ['analytics:read']
      default:
        return []
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8A00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-2">
                Manage user accounts, roles, and permissions
              </p>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#FF8A00] text-white px-6 py-3 rounded-lg hover:bg-[#FF6B00] transition-colors font-medium flex items-center space-x-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>Add User</span>
            </button>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('')
                setRoleFilter('all')
                setStatusFilter('all')
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
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
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-[#FF8A00] flex items-center justify-center text-white font-medium">
                            {user.first_name[0]}{user.last_name[0]}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(user.status)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.last_login ? user.last_login.toLocaleDateString() : 'Never'}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.created_at.toLocaleDateString()}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setEditingUser(user)
                            setShowEditModal(true)
                          }}
                          className="text-[#FF8A00] hover:text-[#FF6B00]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        
                        <select
                          value={user.status}
                          onChange={(e) => handleStatusChange(user.id, e.target.value as 'active' | 'inactive' | 'suspended')}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="suspended">Suspended</option>
                        </select>
                        
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <Users className="w-8 h-8 text-[#FF8A00] mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{users.length}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <Shield className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {users.filter(u => u.role === 'admin').length}
            </div>
            <div className="text-sm text-gray-600">Admins</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {users.filter(u => u.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {users.filter(u => u.last_login && new Date(u.last_login) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
            </div>
            <div className="text-sm text-gray-600">Active This Week</div>
          </div>
        </motion.div>
      </main>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Create New User</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleCreateUser({
                email: formData.get('email') as string,
                first_name: formData.get('first_name') as string,
                last_name: formData.get('last_name') as string,
                role: formData.get('role') as 'admin' | 'editor' | 'viewer',
                password: formData.get('password') as string
              })
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    name="role"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF8A00] text-white px-4 py-2 rounded-lg hover:bg-[#FF6B00] transition-colors"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit User</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleEditUser({
                first_name: formData.get('first_name') as string,
                last_name: formData.get('last_name') as string,
                role: formData.get('role') as 'admin' | 'editor' | 'viewer'
              })
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      defaultValue={editingUser.first_name}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      defaultValue={editingUser.last_name}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    name="role"
                    defaultValue={editingUser.role}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingUser(null)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF8A00] text-white px-4 py-2 rounded-lg hover:bg-[#FF6B00] transition-colors"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
