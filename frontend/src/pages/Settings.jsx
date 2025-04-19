import { Settings, Eye, Keyboard, Shield, Bell, Moon } from 'lucide-react';
import Navbar from '../navbar/Nav';

export default function SettingsPage() {
  const settingsCategories = [
    {
      name: "Tracking Settings",
      icon: <Eye className="h-5 w-5 text-indigo-400" />,
      settings: [
        {
          name: "Enable Eye Tracking",
          description: "Use webcam to track your gaze direction",
          enabled: true
        },
        {
          name: "Keyboard Analysis",
          description: "Monitor typing patterns for focus detection",
          enabled: true
        },
        {
          name: "Periodic Screenshots",
          description: "Capture screen content for better distraction detection",
          enabled: false
        }
      ]
    },
    {
      name: "Blocking Settings",
      icon: <Shield className="h-5 w-5 text-indigo-400" />,
      settings: [
        {
          name: "Auto-block Distractions",
          description: "Automatically block detected distracting websites",
          enabled: true
        },
        {
          name: "Strict Mode",
          description: "Block all non-work related sites during focus sessions",
          enabled: false
        },
        {
          name: "Allow Overrides",
          description: "Let me temporarily access blocked sites when needed",
          enabled: true
        }
      ]
    },
    {
      name: "Notification Settings",
      icon: <Bell className="h-5 w-5 text-indigo-400" />,
      settings: [
        {
          name: "Focus Alerts",
          description: "Notify me when my focus level changes significantly",
          enabled: true
        },
        {
          name: "Distraction Warnings",
          description: "Alert me when I'm getting distracted",
          enabled: true
        },
        {
          name: "Daily Summary",
          description: "Send me a report of my daily focus metrics",
          enabled: false
        }
      ]
    },
    {
      name: "Appearance",
      icon: <Moon className="h-5 w-5 text-indigo-400" />,
      settings: [
        {
          name: "Dark Mode",
          description: "Use dark theme for the application",
          enabled: true
        },
        {
          name: "Compact View",
          description: "Use more compact UI elements",
          enabled: false
        }
      ]
    }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg text-gray-200">
        <Navbar/>
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <Settings className="h-6 w-6 mr-2 text-indigo-400" />
        Settings
      </h2>
      
      <div className="space-y-8">
        {settingsCategories.map((category, catIndex) => (
          <div key={catIndex} className="border-b border-gray-700 pb-6 last:border-0">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </h3>
            
            <div className="space-y-4">
              {category.settings.map((setting, setIndex) => (
                <div key={setIndex} className="flex items-center justify-between p-3 hover:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">{setting.name}</h4>
                    <p className="text-sm text-gray-400">{setting.description}</p>
                  </div>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      setting.enabled ? 'bg-indigo-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        setting.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
