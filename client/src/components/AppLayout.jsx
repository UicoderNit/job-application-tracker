import { BriefcaseBusiness, LayoutDashboard, LogOut, Plus, Search } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const AppLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-ink text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'
    }`;

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand text-white">
              <BriefcaseBusiness size={22} aria-hidden="true" />
            </div>
            <div>
              <p className="text-base font-bold text-ink">JobFlow</p>
              <p className="text-xs text-muted">Welcome, {user?.name}</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/" className={linkClass}>
              <LayoutDashboard size={17} aria-hidden="true" />
              Dashboard
            </NavLink>
            <NavLink to="/jobs" className={linkClass}>
              <Search size={17} aria-hidden="true" />
              Applications
            </NavLink>
            <NavLink to="/jobs/new" className={linkClass}>
              <Plus size={17} aria-hidden="true" />
              Add job
            </NavLink>
            <button type="button" className="btn-secondary" onClick={handleLogout}>
              <LogOut size={17} aria-hidden="true" />
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
