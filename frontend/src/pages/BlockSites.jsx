import { Shield, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../navbar/Nav';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BlockedSitesPage() {
  const [blockedSites, setBlockedSites] = useState([]);
  const [newDomain, setNewDomain] = useState('');
  const [newCategory, setNewCategory] = useState('Uncategorized');
  
  // Fetch blocked sites on component mount
  useEffect(() => {
    fetchBlockedSites();
  }, []);

  const fetchBlockedSites = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/blocked-sites');
      setBlockedSites(response.data);
    } catch (error) {
      console.error('Error fetching blocked sites:', error);
    }
  };

  const addBlockedSite = async () => {
    if (!newDomain) return;
    
    try {
      const response = await axios.post('http://localhost:3001/api/blocked-sites', {
        domain: newDomain,
        category: newCategory
      });
      setBlockedSites([...blockedSites, response.data]);
      setNewDomain('');
    } catch (error) {
      console.error('Error adding blocked site:', error);
    }
  };

  const removeBlockedSite = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/blocked-sites/${id}`);
      setBlockedSites(blockedSites.filter(site => site.id !== id));
    } catch (error) {
      console.error('Error removing blocked site:', error);
    }
  };

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
          onClick={() => document.getElementById('addSiteModal').showModal()}
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
                  <button 
                    className="text-red-400 hover:text-red-300 flex items-center"
                    onClick={() => removeBlockedSite(site.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Add Site Modal */}
      <dialog id="addSiteModal" className="bg-gray-800 rounded-lg p-6 text-white">
        <h3 className="font-bold text-lg mb-4">Add New Blocked Site</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Domain</label>
            <input
              type="text"
              placeholder="example.com"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-gray-100"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-gray-100"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="Social Media">Social Media</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="News">News</option>
              <option value="Uncategorized">Uncategorized</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500"
              onClick={() => document.getElementById('addSiteModal').close()}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500"
              onClick={addBlockedSite}
            >
              Block Site
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}