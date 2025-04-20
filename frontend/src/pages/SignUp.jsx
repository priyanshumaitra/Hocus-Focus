import { useState, useEffect } from 'react';
import { signUp } from '../services/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [gradientPos, setGradientPos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setGradientPos({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signUp(email, password, username);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-[#432dd7]/10 blur-3xl"
          style={{
            transform: `translate(${gradientPos.x * 30}px, ${gradientPos.y * 30}px)`
          }}
        ></div>
        <div 
          className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#818cf8]/10 blur-3xl"
          style={{
            transform: `translate(${gradientPos.x * -30}px, ${gradientPos.y * -30}px)`
          }}
        ></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 space-y-6 rounded-2xl bg-[#1e293b]/80 backdrop-blur-lg border border-[#334155]/50 shadow-2xl relative z-10"
      >
        {/* Header with animated icon */}
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#432dd7] to-[#818cf8] flex items-center justify-center shadow-lg mb-4"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" 
              />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-1">Join Us Today</h1>
          <p className="text-[#94a3b8]">Create your account to get started</p>
        </div>

        {/* Error message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-3 bg-red-500/10 text-red-400 rounded-lg text-sm border border-red-500/30 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#e2e8f0] mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-[#64748b]" />
              </div>
              <input
                id="username"
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-[#1e293b] border border-[#334155] rounded-xl focus:ring-2 focus:ring-[#818cf8] focus:border-transparent text-white placeholder-[#64748b] transition-all duration-200"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#e2e8f0] mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-[#64748b]" />
              </div>
              <input
                id="email"
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#1e293b] border border-[#334155] rounded-xl focus:ring-2 focus:ring-[#818cf8] focus:border-transparent text-white placeholder-[#64748b] transition-all duration-200"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#e2e8f0] mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-[#64748b]" />
              </div>
              <input
                id="password"
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#1e293b] border border-[#334155] rounded-xl focus:ring-2 focus:ring-[#818cf8] focus:border-transparent text-white placeholder-[#64748b] transition-all duration-200"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-2 flex items-center">
              <div className="w-full bg-[#334155] rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${password.length > 8 ? 'bg-green-500' : password.length > 5 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                  style={{ width: `${Math.min(100, password.length * 12.5)}%` }}
                ></div>
              </div>
              <span className="ml-2 text-xs text-[#94a3b8]">
                {password.length > 8 ? 'Strong' : password.length > 5 ? 'Medium' : 'Weak'}
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              required
              className="w-4 h-4 text-[#818cf8] bg-[#1e293b] border-[#334155] rounded focus:ring-[#818cf8] focus:ring-2"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-[#94a3b8]">
              I agree to the <a href="#" className="text-[#818cf8] hover:underline">Terms and Conditions</a>
            </label>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center
              ${loading ? 'bg-[#432dd7]/80 cursor-not-allowed' : 'bg-gradient-to-r from-[#432dd7] to-[#818cf8] hover:from-[#3b28c0] hover:to-[#727cf7] shadow-lg'}`}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            onHoverStart={() => !loading && setIsHovered(true)}
            onHoverEnd={() => !loading && setIsHovered(false)}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              <>
                Sign Up
                <motion.span
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                  className="ml-2"
                >
                  <FiArrowRight className="h-5 w-5" />
                </motion.span>
              </>
            )}
          </motion.button>
        </form>

        <div className="text-center text-sm text-[#94a3b8]">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-[#818cf8] hover:text-[#6366f1] font-medium transition-colors relative group"
          >
            Log in
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#818cf8] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        

       
      </motion.div>
    </div>
  );
}