import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, BookOpen, UtensilsCrossed, LogOut, Zap } from 'lucide-react';
import logo from '../assets/CogniCook Logo.png';
import { useAuth } from '../utils/auth';

interface HeaderProps {
  showNavigation?: boolean;
}

export default function Header({ showNavigation = true }: HeaderProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-primary-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center group">
            <img 
              src={logo} 
              alt="CogniCook Logo" 
              className="h-20 w-20 object-contain transition-transform group-hover:scale-110"
            />
          </Link>

          {/* Navigation */}
          {showNavigation && (
            <nav className="flex items-center gap-1">
              <Link
                to="/home"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all"
              >
                <ChefHat className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link
                to="/quad-lock"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all shadow-md hover:shadow-lg"
              >
                <Zap className="w-5 h-5" />
                <span className="hidden sm:inline">Start Cooking</span>
              </Link>
              <Link
                to="/kitchen"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all"
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span className="hidden sm:inline">My Kitchen</span>
              </Link>
              <Link
                to="/cookbook"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all"
              >
                <BookOpen className="w-5 h-5" />
                <span className="hidden sm:inline">Cookbook</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all ml-2"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}