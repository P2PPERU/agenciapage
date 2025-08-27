// src/components/admin/AdminDashboard.jsx
import { motion } from 'framer-motion';
import { 
  FaNewspaper, FaUsers, FaChartLine, 
  FaDollarSign, FaEye, FaTrophy, FaFire 
} from 'react-icons/fa';

const AdminDashboard = ({ stats }) => {
  const cards = [
    {
      title: 'Noticias Publicadas',
      value: stats.totalNews || 0,
      icon: FaNewspaper,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      title: 'Usuarios Activos',
      value: stats.totalUsers || 0,
      icon: FaUsers,
      color: 'from-green-500 to-green-600',
      change: '+8%'
    },
    {
      title: 'Rake Total',
      value: `S/${stats.totalRake?.toFixed(2) || 0}`,
      icon: FaChartLine,
      color: 'from-purple-500 to-purple-600',
      change: '+23%'
    },
    {
      title: 'Bonos Liberados',
      value: `S/${stats.totalBonusReleased?.toFixed(2) || 0}`,
      icon: FaDollarSign,
      color: 'from-yellow-500 to-orange-500',
      change: '+15%'
    }
  ];
  
  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl overflow-hidden"
          >
            <div className={`bg-gradient-to-r ${card.color} p-1`} />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${card.color} rounded-lg`}>
                  <card.icon className="text-2xl text-white" />
                </div>
                <span className="text-green-400 text-sm font-bold">
                  {card.change}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Top News */}
      {stats.topNews && stats.topNews.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaFire className="text-poker-gold" />
              Noticias Más Vistas
            </h3>
            <div className="space-y-3">
              {stats.topNews.map((news, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-poker-gold">
                      {index + 1}
                    </span>
                    <p className="text-white">{news.title}</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <FaEye />
                    <span>{news.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaTrophy className="text-poker-gold" />
              Actividad Reciente
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <p className="text-gray-300">Nueva noticia publicada</p>
                <span className="text-xs text-gray-500">Hace 2h</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <p className="text-gray-300">Usuario registrado</p>
                <span className="text-xs text-gray-500">Hace 3h</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <p className="text-gray-300">Rake procesado</p>
                <span className="text-xs text-gray-500">Hace 5h</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;