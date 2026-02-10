import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, LayoutDashboard, Plus, LogOut, Menu, X } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const Layout = ({ children, title, subtitle, activeMenu = 'dashboard', customHeader }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    { id: 'dashboard', path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'inventory', path: '#', icon: Package, label: 'Inventory List' },
    { id: 'add-item', path: '/add-item', icon: Plus, label: 'Add Item' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-linear-to-b from-mandiri-blue to-blue-900 text-white 
        flex flex-col shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-mandiri-gold rounded-full flex items-center justify-center">
              <Package size={20} className="text-mandiri-blue" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-mandiri-gold">Bank Mandiri</h1>
              <p className="text-xs text-gray-300">Inventory System</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-mandiri-gold text-mandiri-blue font-semibold shadow-lg hover:shadow-xl'
                        : 'hover:bg-white/10 hover:translate-x-1'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-blue-700">
          <div className="mb-4 p-3 bg-blue-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-mandiri-gold rounded-full flex items-center justify-center text-mandiri-blue font-bold text-sm">
                AI
              </div>
              <div>
                <p className="text-sm font-semibold">Andi Isar</p>
                <p className="text-xs text-blue-200">Administrator</p>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600/20 hover:text-red-300 transition-all w-full text-left"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 shrink-0">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            {customHeader ? (
              <div className="flex items-center gap-3 sm:gap-4">
                <button 
                  onClick={toggleSidebar}
                  className="lg:hidden text-mandiri-blue hover:bg-mandiri-blue/10 p-2 rounded-lg shrink-0 transition-colors"
                >
                  <Menu size={24} />
                </button>
                {customHeader}
              </div>
            ) : (
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Mobile Menu Button */}
                <button 
                  onClick={toggleSidebar}
                  className="lg:hidden text-mandiri-blue hover:bg-mandiri-blue/10 p-2 rounded-lg shrink-0 transition-colors"
                >
                  <Menu size={24} />
                </button>
                
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-mandiri-blue truncate">
                    {title}
                  </h2>
                  {subtitle && (
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
