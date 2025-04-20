import { useState, useEffect } from 'react';
import { logIn } from '../services/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Gradient animation effect
  const [gradientPos, setGradientPos] = useState({ x: 0, y: 0 });
  
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
      await logIn(email, password);
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-1">Welcome Back</h1>
          <p className="text-[#94a3b8]">Sign in to access your account</p>
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
            <label htmlFor="email" className="block text-sm font-medium text-[#e2e8f0] mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-[#1e293b] border border-[#334155] rounded-xl focus:ring-2 focus:ring-[#818cf8] focus:border-transparent text-white placeholder-[#64748b] transition-all duration-200"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#e2e8f0] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-[#1e293b] border border-[#334155] rounded-xl focus:ring-2 focus:ring-[#818cf8] focus:border-transparent text-white placeholder-[#64748b] transition-all duration-200"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-right">
              <Link to="/forgot-password" className="text-sm text-[#818cf8] hover:text-[#6366f1] transition-colors">
                Forgot password?
              </Link>
            </div>
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
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
              </>
            )}
          </motion.button>
        </form>

        <div className="text-center text-sm text-[#94a3b8]">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="text-[#818cf8] hover:text-[#6366f1] font-medium transition-colors relative group"
          >
            Sign up
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#818cf8] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

       

       
      </motion.div>
    </div>
  );
}