import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  Package, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  Users,
  FileText,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const headerContent = (
    <div className="flex items-center justify-between gap-4 w-full">
      <div className="min-w-0 flex-1">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-mandiri-blue mb-1 truncate">
          Selamat Datang, Andi Isar
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 flex-wrap">
          <Calendar size={14} className="shrink-0" />
          <span className="hidden sm:inline">{formatDate(currentDate)}</span>
          <span className="sm:hidden">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <span>•</span>
          <span>{formatTime(currentDate)}</span>
        </p>
      </div>
      <div className="text-right hidden sm:block shrink-0">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">System Online</span>
        </div>
      </div>
    </div>
  );

  return (
    <Layout 
      activeMenu="dashboard"
      customHeader={headerContent}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-450 mx-auto w-full">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Barang Card */}
          <div className="bg-linear-to-br from-white to-blue-50 rounded-xl shadow-lg p-4 sm:p-6 border border-blue-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-mandiri-blue to-blue-700 rounded-xl flex items-center justify-center shadow-md shrink-0">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs sm:text-sm font-semibold">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>+12%</span>
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium uppercase tracking-wide">Total Barang</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2 mb-1">150</h3>
            <p className="text-xs text-gray-500">Semua barang dalam sistem</p>
          </div>

          {/* Menunggu Approval Card */}
          <div className="bg-linear-to-br from-white to-yellow-50 rounded-xl shadow-lg p-4 sm:p-6 border border-yellow-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-mandiri-gold to-yellow-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                Pending
              </span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium uppercase tracking-wide">Menunggu Approval</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2 mb-1">12</h3>
            <p className="text-xs text-gray-500">Perlu peninjauan segera</p>
          </div>

          {/* Perlu Perbaikan Card */}
          <div className="bg-linear-to-br from-white to-red-50 rounded-xl shadow-lg p-4 sm:p-6 border border-red-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-md shrink-0">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                Urgent
              </span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium uppercase tracking-wide">Perlu Perbaikan</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2 mb-1">8</h3>
            <p className="text-xs text-gray-500">Memerlukan perhatian khusus</p>
          </div>
        </div>

        {/* Second Row - Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Aktivitas Terbaru */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-mandiri-blue mb-4 sm:mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Aktivitas Terbaru
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {[
                { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', title: 'Item Disetujui', desc: 'Laptop Dell Latitude 5420', time: '5 menit lalu' },
                { icon: Plus, color: 'text-blue-600', bg: 'bg-blue-100', title: 'Item Baru Ditambahkan', desc: 'Monitor LG 24 inch', time: '15 menit lalu' },
                { icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-100', title: 'Perbaikan Diminta', desc: 'Printer HP LaserJet', time: '1 jam lalu' },
                { icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', title: 'Admin Baru', desc: 'Budi Santoso bergabung', time: '2 jam lalu' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 ${activity.bg} rounded-lg flex items-center justify-center shrink-0`}>
                    <activity.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-gray-800">{activity.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{activity.desc}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-mandiri-blue mb-4 sm:mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 sm:p-4 bg-linear-to-r from-mandiri-blue to-blue-700 text-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                <FileText className="w-5 h-5 shrink-0" />
                <span className="text-sm font-semibold">Lihat Laporan</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 sm:p-4 bg-linear-to-r from-mandiri-gold to-yellow-500 text-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                <Users className="w-5 h-5 shrink-0" />
                <span className="text-sm font-semibold">Kelola User</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 sm:p-4 bg-linear-to-r from-green-500 to-green-700 text-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span className="text-sm font-semibold">Approval Queue</span>
              </button>
            </div>
            
            {/* Mini Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Total Users</span>
                <span className="text-xs sm:text-sm font-bold text-gray-800">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Cabang Aktif</span>
                <span className="text-xs sm:text-sm font-bold text-gray-800">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Approval Rate</span>
                <span className="text-xs sm:text-sm font-bold text-mandiri-blue">94%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
