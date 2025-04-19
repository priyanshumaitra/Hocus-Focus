import { Shield, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../navbar/Nav';

const blockedSites = [
  { id: 1, domain: 'facebook.com', category: 'Social Media', blockedCount: 12 },
  { id: 2, domain: 'twitter.com', category: 'Social Media', blockedCount: 8 },
  { id: 3, domain: 'youtube.com', category: 'Entertainment', blockedCount: 15 },
  { id: 4, domain: 'reddit.com', category: 'Social Media', blockedCount: 5 },
  { id: 5, domain: 'amazon.com', category: 'Shopping', blockedCount: 3 },
];

export default function BlockedSitesPage() {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg text-gray-200">
        <Navbar/>
      <div className="flex justify-between items-center mb-6">
        
        <h2 className="text-2xl font-bold flex items-center text-white">
          <Shield className="h-6 w-6 mr-2 text-indigo-400" />
          Blocked Websites
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md flex items-center text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Site
        </motion.button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Domain</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Times Blocked</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {blockedSites.map((site) => (
              <motion.tr 
                key={site.id}
                whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.6)' }}
                className="hover:bg-gray-700"
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-100">{site.domain}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-700 text-gray-300">
                    {site.category}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">
                  {site.blockedCount} times
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-red-400 hover:text-red-300 flex items-center">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="font-medium text-white mb-2">Add New Blocked Site</h3>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter domain (e.g. example.com)"
            className="flex-1 bg-gray-800 border border-gray-600 rounded-l-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md text-white">
            Block Site
          </button>
        </div>
      </div>
    </div>
  );
}
