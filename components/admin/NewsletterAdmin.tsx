"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Subscriber {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  industry?: string;
  interests: string[];
  source: string;
  subscriptionDate: string;
  status: 'active' | 'unsubscribed';
  gdprConsent: boolean;
  unsubscribedDate?: string;
  unsubscribeReason?: string;
}

interface NewsletterStats {
  totalSubscribers: number;
  activeSubscribers: number;
  recentSubscribers: Subscriber[];
  industryBreakdown: Record<string, number>;
  sourceBreakdown: Record<string, number>;
}

export default function NewsletterAdmin() {
  const [stats, setStats] = useState<NewsletterStats | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);

  useEffect(() => {
    fetchStats();
    fetchSubscribers();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/newsletter/subscribe');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchSubscribers = async () => {
    try {
      // This would be a new endpoint for getting all subscribers
      // For now, we'll use the stats endpoint
      const response = await fetch('/api/newsletter/subscribe');
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.recentSubscribers || []);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async (email: string) => {
    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Refresh data
        fetchStats();
        fetchSubscribers();
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleReactivate = async (_email: string) => {
    try {
      // This would require a reactivate endpoint
      // For now, we'll just refresh the data
      fetchStats();
      fetchSubscribers();
    } catch (error) {
      console.error('Error reactivating:', error);
    }
  };

  const filteredSubscribers = subscribers.filter(sub =>
    sub.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sub.company && sub.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-[#FF8A00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Newsletter Admin Dashboard</h1>
          <p className="text-gray-400">Manage your newsletter subscribers and campaigns</p>
        </motion.div>

        {/* Stats Cards */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Subscribers</h3>
              <p className="text-3xl font-bold text-[#FF8A00]">{stats.totalSubscribers}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Active Subscribers</h3>
              <p className="text-3xl font-bold text-green-400">{stats.activeSubscribers}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Unsubscribed</h3>
              <p className="text-3xl font-bold text-red-400">{stats.totalSubscribers - stats.activeSubscribers}</p>
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search subscribers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
              />
            </div>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-[#FF8A00] text-white rounded-xl font-semibold hover:bg-[#FF6B00] transition-colors"
            >
              Export Data
            </button>
          </div>
        </motion.div>

        {/* Subscribers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/20">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Industry</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">{subscriber.firstName} {subscriber.lastName}</p>
                        <p className="text-sm text-gray-400">{subscriber.interests.join(', ')}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{subscriber.email}</td>
                    <td className="px-6 py-4 text-gray-300">{subscriber.company || '-'}</td>
                    <td className="px-6 py-4 text-gray-300">{subscriber.industry || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        subscriber.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(subscriber.subscriptionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {subscriber.status === 'active' ? (
                          <button
                            onClick={() => handleUnsubscribe(subscriber.email)}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                          >
                            Unsubscribe
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReactivate(subscriber.email)}
                            className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors"
                          >
                            Reactivate
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedSubscriber(subscriber)}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Industry Breakdown */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Industry Breakdown</h3>
              <div className="space-y-2">
                {Object.entries(stats.industryBreakdown).map(([industry, count]) => (
                  <div key={industry} className="flex justify-between items-center">
                    <span className="text-gray-300">{industry}</span>
                    <span className="text-[#FF8A00] font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Source Breakdown</h3>
              <div className="space-y-2">
                {Object.entries(stats.sourceBreakdown).map(([source, count]) => (
                  <div key={source} className="flex justify-between items-center">
                    <span className="text-gray-300">{source}</span>
                    <span className="text-[#FF8A00] font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Subscriber Detail Modal */}
      {selectedSubscriber && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-4">Subscriber Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">Name</label>
                <p className="text-white">{selectedSubscriber.firstName} {selectedSubscriber.lastName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <p className="text-white">{selectedSubscriber.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Company</label>
                <p className="text-white">{selectedSubscriber.company || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Industry</label>
                <p className="text-white">{selectedSubscriber.industry || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Interests</label>
                <p className="text-white">{selectedSubscriber.interests.join(', ') || 'None selected'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Subscription Date</label>
                <p className="text-white">{new Date(selectedSubscriber.subscriptionDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Status</label>
                <p className={`font-medium ${
                  selectedSubscriber.status === 'active' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {selectedSubscriber.status}
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedSubscriber(null)}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
              >
                Close
              </button>
              {selectedSubscriber.status === 'active' ? (
                <button
                  onClick={() => {
                    handleUnsubscribe(selectedSubscriber.email);
                    setSelectedSubscriber(null);
                  }}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Unsubscribe
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleReactivate(selectedSubscriber.email);
                    setSelectedSubscriber(null);
                  }}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Reactivate
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
