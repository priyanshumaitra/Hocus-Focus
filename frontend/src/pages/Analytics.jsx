import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2, Clock, TrendingUp, Zap } from 'lucide-react';
import Navbar from '../navbar/Nav';

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

const COLORS = ['#818cf8', '#60a5fa', '#38bdf8', '#22d3ee'];

const timeOfDayData = [
  { name: 'Morning', focus: 85 },
  { name: 'Afternoon', focus: 72 },
  { name: 'Evening', focus: 64 },
  { name: 'Night', focus: 58 },
];



export default function Analytics() {
  return (
    <div className="space-y-8 text-gray-100">
       
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <Navbar/>
        <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
          <BarChart2 className="h-6 w-6 mr-2 text-indigo-400" />
          Focus Analytics
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-100">
              <TrendingUp className="h-5 w-5 mr-2 text-indigo-400" />
              Weekly Focus Trend
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={focusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis domain={[0, 100]} stroke="#ccc" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="focus" 
                    stroke="#818cf8" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-100">
              <Zap className="h-5 w-5 mr-2 text-indigo-400" />
              Distraction Sources
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distractionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {distractionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-100">
              <Clock className="h-5 w-5 mr-2 text-indigo-400" />
              Focus by Time of Day
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeOfDayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis domain={[0, 100]} stroke="#ccc" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  />
                  <Bar 
                    dataKey="focus" 
                    fill="#818cf8" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Focus Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Avg Focus Score', value: '78%', change: '+5%' },
                { name: 'Longest Session', value: '3h 22m', change: '+18m' },
                { name: 'Distractions Blocked', value: '24', change: '-3' },
                { name: 'Productivity', value: '82%', change: '+7%' },
              ].map((metric, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-200 text-sm">{metric.name}</p>
                  <div className="flex items-end mt-2">
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <p className={`ml-2 text-sm ${
                      metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metric.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
