import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  
  // Dynamic Letter Avatar
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0066FF&color=fff&bold=true`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-5xl h-16 flex items-center justify-between px-6">
        
        {/* BRAND LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-blue-500 transition-all">
            <span className="text-white font-black text-xl">V</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
            Vaib<span className="text-blue-600">Flow</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/profile" 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
              location.pathname === '/profile' 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="h-8 w-8 rounded-full border border-slate-200 overflow-hidden shadow-sm bg-slate-100">
                <img 
                  src={user?.profilePicture || avatarUrl} 
                  className="h-full w-full object-cover" 
                  alt="pfp" 
                />
            </div>
            <span className="hidden md:block text-sm font-bold uppercase tracking-wider">
              {user?.name?.split(' ')[0] || 'Profile'}
            </span>
          </Link>
          
          <div className="w-[1px] h-6 bg-slate-200 mx-1"></div>
          
          <button 
            onClick={logout} 
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;