import { Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LogOut, Home, Settings } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-base text-fg flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-base/50 p-6 flex flex-col h-screen sticky top-0">
        <div className="flex items-center gap-3 mb-10">
          <Settings className="text-primary w-6 h-6" />
          <h1 className="text-xl font-bold">Admin CRM</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => navigate('/admin')}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 text-primary transition-colors text-sm font-medium"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </button>
          {/* Add more links here if needed */}
        </nav>

        <div className="mt-auto space-y-4">
          <a href="/" target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
            View Live Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
