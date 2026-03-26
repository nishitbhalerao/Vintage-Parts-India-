import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not admin
  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-offWhite flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-offWhite py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-text-navy mb-2">
                🛡️ Admin Dashboard
              </h1>
              <p className="text-text-muted">
                Manage users, parts, and platform settings
              </p>
            </div>
            <div className="bg-warning/10 border border-warning/20 rounded-lg px-4 py-2">
              <span className="text-warning font-medium">Admin Access</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm font-medium">Total Users</p>
                <p className="font-mono font-bold text-2xl text-text-navy">
                  {stats?.stats.totalUsers || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm font-medium">Total Parts</p>
                <p className="font-mono font-bold text-2xl text-text-navy">
                  {stats?.stats.totalParts || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm font-medium">Featured Parts</p>
                <p className="font-mono font-bold text-2xl text-text-navy">
                  {stats?.stats.featuredParts || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm font-medium">Pending Verification</p>
                <p className="font-mono font-bold text-2xl text-text-navy">
                  {stats?.stats.pendingParts || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <a
            href="/admin/users"
            className="card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary-blue"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="font-display font-semibold text-lg text-text-navy mb-2">
                Manage Users
              </h3>
              <p className="text-text-muted text-sm">
                View, edit, and delete user accounts
              </p>
            </div>
          </a>

          <a
            href="/admin/parts"
            className="card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary-blue"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="font-display font-semibold text-lg text-text-navy mb-2">
                Manage Parts
              </h3>
              <p className="text-text-muted text-sm">
                Review, feature, and moderate parts
              </p>
            </div>
          </a>

          <a
            href="/admin/verification"
            className="card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary-blue"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-display font-semibold text-lg text-text-navy mb-2">
                Verification Queue
              </h3>
              <p className="text-text-muted text-sm">
                Approve or reject part listings
              </p>
            </div>
          </a>

          <a
            href="/admin/analytics"
            className="card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary-blue"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-display font-semibold text-lg text-text-navy mb-2">
                Analytics
              </h3>
              <p className="text-text-muted text-sm">
                View platform statistics and trends
              </p>
            </div>
          </a>
        </motion.div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card p-6"
          >
            <h3 className="font-display font-semibold text-xl text-text-navy mb-4">
              Recent Users
            </h3>
            <div className="space-y-4">
              {stats?.recentUsers?.map((user) => (
                <div key={user._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-text-navy">{user.name}</div>
                      <div className="text-sm text-text-muted">{user.email}</div>
                    </div>
                  </div>
                  <div className="text-sm text-text-muted">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Parts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card p-6"
          >
            <h3 className="font-display font-semibold text-xl text-text-navy mb-4">
              Recent Parts
            </h3>
            <div className="space-y-4">
              {stats?.recentParts?.map((part) => (
                <div key={part._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-text-navy">{part.title}</div>
                    <div className="text-sm text-text-muted">
                      by {part.seller?.name} • {part.vehicleMake} {part.vehicleModel}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-primary-blue">
                      ₹{part.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-text-muted">
                      {part.views} views
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;