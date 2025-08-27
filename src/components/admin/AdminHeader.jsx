// src/components/admin/AdminHeader.jsx
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaUserShield } from 'react-icons/fa';

const AdminHeader = ({ onLogout }) => {
  return (
    <div className="bg-gray-800 shadow-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
              <FaUserShield className="text-2xl text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
              <p className="text-xs text-gray-400">Gestión completa del sistema</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <FaSignOutAlt />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;