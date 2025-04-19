import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Keyboard, Gauge, BrainCircuit, Shield, Settings, BarChart2, Zap } from 'lucide-react';
import { Clock, Calendar, TrendingUp, AlertCircle, Target } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Nav from '../navbar/Nav';

const focusData = [
  { name: 'Mon', focus: 75 },
  { name: 'Tue', focus: 82 },
  { name: 'Wed', focus: 68 },
  { name: 'Thu', focus: 91 },
  { name: 'Fri', focus: 78 },
  { name: 'Sat', focus: 45 },
  { name: 'Sun', focus: 30 },
];

const distractionData = [
  { name: 'Social Media', value: 45 },
  { name: 'News Sites', value: 25 },
  { name: 'Entertainment', value: 20 },
  { name: 'Shopping', value: 10 },
];

const realTimeData = Array.from({ length: 30 }, (_, i) => ({
  second: i,
  focus: Math.floor(Math.random() * 30) + 70 - (i > 15 ? (i - 15) * 2 : 0),
}));




export default function HomePage() {

    
  const [isTracking, setIsTracking] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotification, setShowNotification] = useState(false);
  const [focusScore, setFocusScore] = useState(82);

  useEffect(() => {
    if (isTracking) {
      const interval = setInterval(() => {
        setFocusScore(prev => {
          const change = Math.floor(Math.random() * 5) - 2;
          return Math.min(100, Math.max(0, prev + change));
        });
        
        // Simulate occasional distraction notifications
        if (Math.random() > 0.85) {
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isTracking]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {/* Navigation */}
      <Nav/>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center"
            >
              <Zap className="h-4 w-4 mr-2" />
              Distraction detected! Blocking social media.
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <motion.section 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <h1 className="text-3xl font-bold mb-4">Enhance Your Focus with AI</h1>
                  <p className="text-gray-300 mb-6">
                    AI Flow State Guardian uses eye-tracking and keyboard analysis to detect distractions 
                    and automatically block distracting websites, helping you maintain deep focus.
                  </p>
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
                    >
                      Get Started
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                    className="relative"
                  >
                    <div className="absolute -inset-4 bg-indigo-500 rounded-xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gray-700 p-6 rounded-lg border border-gray-600">
                      <div className="flex items-center mb-4">
                        <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="bg-gray-800 rounded p-4 h-64 flex flex-col justify-between">
                        <div className="text-green-400 font-mono text-sm">
                          $ Focus Mode: ACTIVE
                        </div>
                        <div className="flex justify-center items-center h-full">
                          <motion.div
                            animate={{ 
                              opacity: [0.6, 1, 0.6],
                              scale: [0.9, 1, 0.9]
                            }}
                            transition={{ 
                              duration: 3,
                              repeat: Infinity,
                              repeatType: 'reverse'
                            }}
                            className="text-center"
                          >
                            <Eye className="h-12 w-12 mx-auto text-indigo-400 mb-2" />
                            <p className="text-gray-300">Tracking your focus</p>
                          </motion.div>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          Blocked 3 distractions today
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Gauge className="h-6 w-6 text-indigo-400 mr-2" />
                  <h3 className="text-lg font-semibold">Focus Score</h3>
                </div>
                <div className="flex items-end">
                  <motion.p 
                    key={focusScore}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl font-bold"
                  >
                    {focusScore}
                  </motion.p>
                  <span className="text-gray-400 ml-1 mb-1">/100</span>
                </div>
                <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${focusScore}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full ${focusScore > 70 ? 'bg-green-500' : focusScore > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {focusScore > 70 ? 'Excellent focus!' : focusScore > 40 ? 'Moderate focus' : 'High distraction'}
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-indigo-400 mr-2" />
                  <h3 className="text-lg font-semibold">Distractions Blocked</h3>
                </div>
                <p className="text-4xl font-bold">24</p>
                <div className="mt-4 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distractionData}>
                      <Bar dataKey="value" fill="#818cf8" radius={[4, 4, 0, 0]} />
                      <XAxis dataKey="name" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Keyboard className="h-6 w-6 text-indigo-400 mr-2" />
                  <h3 className="text-lg font-semibold">Typing Analysis</h3>
                </div>
                <p className="text-4xl font-bold">92%</p>
                <p className="text-sm text-gray-400 mt-1">Consistent typing pattern</p>
                <div className="mt-4 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={realTimeData.slice(-10)}>
                      <Area type="monotone" dataKey="focus" stroke="#818cf8" fill="#818cf8" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.section>

            {/* Charts Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Weekly Focus Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={focusData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="focus" 
                        stroke="#818cf8" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, stroke: '#6366f1', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Real-time Focus Monitoring</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={realTimeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="second" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="focus" 
                        stroke="#818cf8" 
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.section>
          </div>
        )}
       
      </main>


      {/* Productivity Tips Section */}
<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8 }}
  className="bg-gray-800 rounded-xl p-6 shadow-lg "
>
  <h3 className="text-lg font-semibold mb-4 flex items-center">
    <Target className="h-5 w-5 mr-2 text-indigo-400" />
    Productivity Tips
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[
      {
        title: "Pomodoro Technique",
        description: "Work for 25 minutes, then take a 5-minute break",
        icon: <Clock className="h-5 w-5 text-indigo-400" />
      },
      {
        title: "Deep Work Blocks",
        description: "Schedule 2-4 hour uninterrupted work sessions",
        icon: <Eye className="h-5 w-5 text-indigo-400" />
      },
      {
        title: "Distraction Journal",
        description: "Note distractions to identify patterns",
        icon: <AlertCircle className="h-5 w-5 text-indigo-400" />
      }
    ].map((tip, index) => (
      <motion.div 
        key={index}
        whileHover={{ y: -5 }}
        className="bg-gray-700 p-4 rounded-lg"
      >
        <div className="flex items-center mb-2">
          {tip.icon}
          <h4 className="font-medium ml-2">{tip.title}</h4>
        </div>
        <p className="text-sm text-gray-400">{tip.description}</p>
      </motion.div>
    ))}
  </div>
</motion.section>

{/* Recent Focus Sessions Section */}
<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.0 }}
  className="bg-gray-800 rounded-xl p-6 shadow-lg"
>
  <h3 className="text-lg font-semibold mb-4 flex items-center">
    <Calendar className="h-5 w-5 mr-2 text-indigo-400" />
    Recent Focus Sessions
  </h3>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-700">
      <thead>
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Session</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Duration</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Focus Score</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {[
          { id: 1, name: 'Deep Work', date: 'Today', duration: '2h 45m', score: 92 },
          { id: 2, name: 'Coding Session', date: 'Yesterday', duration: '1h 30m', score: 85 },
          { id: 3, name: 'Research', date: '2 days ago', duration: '45m', score: 78 },
        ].map((session) => (
          <tr key={session.id} className="hover:bg-gray-700">
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2 text-yellow-400" />
                <div className="text-sm font-medium">{session.name}</div>
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">
              {session.date}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
              {session.duration}
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="w-16 h-2 bg-gray-600 rounded-full mr-2">
                  <div 
                    className={`h-full rounded-full ${
                      session.score > 80 ? 'bg-green-500' : 
                      session.score > 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${session.score}%` }}
                  />
                </div>
                <span className="text-sm">{session.score}%</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</motion.section>

{/* Weekly Progress Summary */}
<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.2 }}
  className="bg-gray-800 rounded-xl p-6 shadow-lg"
>
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
    <h3 className="text-lg font-semibold flex items-center">
      <TrendingUp className="h-5 w-5 mr-2 text-indigo-400" />
      Weekly Progress
    </h3>
    <div className="flex space-x-2 mt-2 md:mt-0">
      <button className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md">
        This Week
      </button>
      <button className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md">
        Last Week
      </button>
    </div>
  </div>
  <div className="grid grid-cols-4 gap-4 text-center">
    {[
      { metric: "Total Hours", value: "14.5", change: "+2.3" },
      { metric: "Avg Focus", value: "82%", change: "+5%" },
      { metric: "Sessions", value: "7", change: "+2" },
      { metric: "Distractions", value: "12", change: "-4" },
    ].map((stat, index) => (
      <div key={index} className="bg-gray-700 p-3 rounded-lg">
        <p className="text-sm text-gray-400">{stat.metric}</p>
        <p className="text-xl font-bold mt-1">{stat.value}</p>
        <p className={`text-xs mt-1 ${
          stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
        }`}>
          {stat.change} from last week
        </p>
      </div>
    ))}
  </div>
</motion.section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BrainCircuit className="h-6 w-6 text-indigo-400 mr-2" />
              <span className="text-lg font-semibold">HocusFocus</span>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} HocusFocus. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}