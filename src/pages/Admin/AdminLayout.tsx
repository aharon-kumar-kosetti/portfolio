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
      <aside className="w-72 border-r border-line bg-card p-6 flex flex-col h-screen sticky top-0 card-shadow z-10">
        <div className="flex items-center gap-3 mb-12 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-warm">
            <Settings size={20} className="text-accent" />
          </span>
          <div>
            <h1 className="font-display text-lg font-black tracking-tight">Admin CRM</h1>
            <div className="font-mono text-[10px] text-muted uppercase tracking-wider mt-0.5">Content Editor</div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => navigate('/admin')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-warm/50 text-fg transition-colors font-display text-sm font-bold border border-warm-deep/30"
          >
            <Home size={18} className="text-accent" />
            Dashboard
          </button>
        </nav>

        <div className="mt-auto space-y-3 pt-6 border-t border-line">
          <a href="/" target="_blank" rel="noreferrer" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-warm/30 transition-colors font-display text-sm font-medium text-muted hover:text-fg">
            View Live Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors font-display text-sm font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-base relative">
        <div className="dotgrid absolute inset-0 opacity-40" aria-hidden />
        <div className="relative p-8 md:p-12 lg:p-16 w-full max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
