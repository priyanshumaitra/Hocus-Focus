import { Clock, Zap, Calendar, BarChart2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../navbar/Nav';

const sessions = [
  { id: 1, name: 'Deep Work', date: '2023-05-15', duration: '2h 45m', focus: 92 },
  { id: 2, name: 'Coding Session', date: '2023-05-14', duration: '1h 30m', focus: 85 },
  { id: 3, name: 'Research', date: '2023-05-13', duration: '45m', focus: 78 },
  { id: 4, name: 'Writing', date: '2023-05-12', duration: '1h 15m', focus: 88 },
  { id: 5, name: 'Planning', date: '2023-05-11', duration: '30m', focus: 72 },
];

const weeklyData = [
  { day: 'Mon', sessions: 3, avgFocus: 82 },
  { day: 'Tue', sessions: 4, avgFocus: 78 },
  { day: 'Wed', sessions: 2, avgFocus: 85 },
  { day: 'Thu', sessions: 5, avgFocus: 79 },
  { day: 'Fri', sessions: 3, avgFocus: 88 },
  { day: 'Sat', sessions: 1, avgFocus: 65 },
  { day: 'Sun', sessions: 0, avgFocus: 0 },
];

export default function FocusSessionsPage() {
  return (
    <div className="space-y-8">
       
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg text-gray-200">
      <Navbar/>
        <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
          <Clock className="h-6 w-6 mr-2 text-indigo-400" />
          Focus Sessions
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">Total Sessions</h3>
            <div className="flex items-end">
              <p className="text-3xl font-bold text-white">24</p>
              <p className="text-green-400 text-sm ml-2">+5 from last week</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">Average Duration</h3>
            <div className="flex items-end">
              <p className="text-3xl font-bold text-white">1h 22m</p>
              <p className="text-green-400 text-sm ml-2">+8m from last week</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">Average Focus</h3>
            <div className="flex items-end">
              <p className="text-3xl font-bold text-white">84%</p>
              <p className="text-red-400 text-sm ml-2">-2% from last week</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
            <BarChart2 className="h-5 w-5 mr-2 text-indigo-400" />
            Weekly Overview
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <Line 
                  type="monotone" 
                  dataKey="avgFocus" 
                  stroke="#4C51BF" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <XAxis dataKey="day" tick={{ fill: '#E2E8F0' }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#E2E8F0' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#2D3748', borderColor: '#4A5568' }}
                  itemStyle={{ color: '#E2E8F0' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
          <Calendar className="h-5 w-5 mr-2 text-indigo-400" />
          Recent Sessions
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Session</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-700">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-yellow-400" />
                      <div className="text-sm font-medium text-white">{session.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">
                    {session.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {session.duration}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-gray-600 rounded-full mr-2">
                        <div 
                          className="h-full rounded-full bg-indigo-500" 
                          style={{ width: `${session.focus}%` }}
                        />
                      </div>
                      <span className="text-sm text-white">{session.focus}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
