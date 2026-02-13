import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Shield, 
  Building, 
  Settings,
  UserCheck,
  AlertCircle
} from 'lucide-react';

const AdminPanel = () => {
  const { userProfile } = useAuth();

  return (
    <Layout 
      activeMenu="admin"
      title="Admin Panel"
      subtitle="Kelola sistem dan pengguna"
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Admin Welcome */}
        <div className="mb-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Shield size={32} />
            <h1 className="text-2xl font-bold">Administrator Dashboard</h1>
          </div>
          <p className="text-blue-100">
            Welcome, {userProfile?.displayName}. You have full access to system management.
          </p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <h3 className="text-3xl font-bold text-gray-800">24</h3>
              </div>
              <Users className="text-blue-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Users</p>
                <h3 className="text-3xl font-bold text-gray-800">18</h3>
              </div>
              <UserCheck className="text-green-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Branches</p>
                <h3 className="text-3xl font-bold text-gray-800">12</h3>
              </div>
              <Building className="text-purple-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Actions</p>
                <h3 className="text-3xl font-bold text-gray-800">5</h3>
              </div>
              <AlertCircle className="text-orange-500" size={40} />
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">User Management</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Kelola pengguna, role, dan akses sistem
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Kelola Pengguna
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building className="text-purple-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Branch Management</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Kelola cabang dan alokasi inventory
            </p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Kelola Cabang
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-green-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Security Settings</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Konfigurasi keamanan dan permissions
            </p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Security Settings
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="text-gray-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">System Settings</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Konfigurasi umum sistem
            </p>
            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              System Settings
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600 shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Admin Access</h3>
              <p className="text-sm text-blue-800">
                This page is only accessible to users with the 'admin' role. Regular users will be redirected automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
