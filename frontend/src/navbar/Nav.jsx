import { motion } from 'framer-motion';
import { BrainCircuit, Eye, EyeOff, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { logOut } from '../services/firebase';  
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function Navbar({ isTracking, setIsTracking }) {
   const { currentUser } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        await logOut();
        // navigate("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Focus Sessions', path: '/sessions' },
    { name: 'Blocked Sites', path: '/block' },
    { name: 'Settings', path: '/settings' },
    { name: 'SignUp', path: '/signup' },
    { name: 'Eye-Tracking', path: '/eye-tracking' },
  ];

  return (
    <nav className="border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <BrainCircuit className="h-8 w-8 text-indigo-400" />
            <a href='/' className="ml-2 text-xl font-bold">HocusFocus</a>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-2">
          {currentUser ? <><p className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }>Logged in as: {currentUser.username?currentUser.username: currentUser.email}</p>
      
        <button
  onClick={handleLogout}
  className="flex items-center justify-center gap-2 py-2 px-4 rounded-md shadow-sm 
            text-sm font-medium text-white bg-red-600 hover:bg-red-700 
            transition-colors duration-200 focus:outline-none focus:ring-2 
            focus:ring-red-500 focus:ring-offset-2"
>
  <LogOut className="h-4 w-4" /> {/* Add your logout icon component */}
  Logout
</button></>: <button
  onClick={() => navigate("/login")}
  className="flex items-center justify-center gap-2 py-2 px-4 rounded-md shadow-sm 
            text-sm font-medium text-white bg-red-600 hover:bg-red-700 
            transition-colors duration-200 focus:outline-none focus:ring-2 
            focus:ring-red-500 focus:ring-offset-2"
>
  <LogOut className="h-4 w-4" /> {/* Add your logout icon component */}
  login
</button>}
          
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsTracking(!isTracking)}
              className={`hidden sm:flex px-4 py-2 rounded-md items-center ${
                isTracking ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isTracking ? (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Tracking Active
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Start Tracking
                </>
              )}
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <button
              onClick={() => {
                setIsTracking(!isTracking);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex justify-start px-3 py-2 rounded-md text-base font-medium ${
                isTracking ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isTracking ? (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Tracking Active
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Start Tracking
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}