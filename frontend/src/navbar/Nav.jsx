import { motion } from 'framer-motion';
import { BrainCircuit, Eye, EyeOff, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ isTracking, setIsTracking }) {
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Focus Sessions', path: '/sessions' },
    { name: 'Blocked Sites', path: '/block' },
    { name: 'Settings', path: '/settings' },
    {name: 'SignUp', path: '/signup'},
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
            <a href='/' className="ml-2 text-xl font-bold">Zenith</a>
          </motion.div>
          
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
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTracking(!isTracking)}
            className={`px-4 py-2 rounded-md flex items-center ${
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
        </div>
      </div>
    </nav>
  );
}