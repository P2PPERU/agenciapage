// src/components/admin/AdminTabs.jsx
import { FaChartLine, FaNewspaper, FaUsers, FaDollarSign } from 'react-icons/fa';

const AdminTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: FaChartLine },
    { id: 'news', name: 'Noticias', icon: FaNewspaper },
    { id: 'users', name: 'Usuarios', icon: FaUsers },
    { id: 'rake', name: 'Rake', icon: FaDollarSign }
  ];
  
  return (
    <div className="flex space-x-2 mb-6 overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <tab.icon />
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;