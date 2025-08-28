// src/components/admin/EnhancedUserSearch.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaUser, 
  FaEnvelope,
  FaTimes,
  FaSpinner,
  FaChevronDown,
  FaFilter,
  FaDollarSign,
  FaPercent,
  FaCheck,
  FaClock
} from 'react-icons/fa';

const EnhancedUserSearch = ({ 
  users = [], 
  onUserSelect, 
  selectedUser, 
  placeholder = "Buscar usuarios...",
  apiCall,
  showFilters = true,
  showStats = true,
  autoFocus = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    minRake: '',
    maxRake: '',
    hasBonuses: 'all'
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Manejar búsqueda local y remota
  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.trim().length < 2) {
        setSearchResults(users.slice(0, 10)); // Mostrar los primeros 10 usuarios
        return;
      }

      setLoading(true);
      
      try {
        // Primero buscar localmente
        const localResults = users.filter(user =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Si tenemos apiCall y pocos resultados locales, buscar remotamente
        if (apiCall && localResults.length < 5) {
          try {
            const remoteResults = await apiCall(`/admin/users/search?q=${encodeURIComponent(searchTerm)}`);
            // Combinar y deduplicar resultados
            const combinedResults = [...localResults];
            remoteResults.forEach(remoteUser => {
              if (!combinedResults.find(localUser => localUser.id === remoteUser.id)) {
                combinedResults.push(remoteUser);
              }
            });
            setSearchResults(combinedResults);
          } catch (error) {
            console.error('Error en búsqueda remota:', error);
            setSearchResults(localResults);
          }
        } else {
          setSearchResults(localResults);
        }
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchUsers, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [searchTerm, users, apiCall]);

  // Aplicar filtros avanzados
  const filteredResults = searchResults.filter(user => {
    if (filters.status !== 'all' && user.status !== filters.status) return false;
    if (filters.minRake && user.total_rake < parseFloat(filters.minRake)) return false;
    if (filters.maxRake && user.total_rake > parseFloat(filters.maxRake)) return false;
    if (filters.hasBonuses === 'yes' && user.bonus_amount <= 0) return false;
    if (filters.hasBonuses === 'no' && user.bonus_amount > 0) return false;
    return true;
  });

  // Manejar clicks fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && !searchRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto focus
  useEffect(() => {
    if (autoFocus && searchRef.current) {
      searchRef.current.focus();
    }
  }, [autoFocus]);

  const handleUserSelect = (user) => {
    onUserSelect(user);
    setSearchTerm(user.username);
    setIsDropdownOpen(false);
  };

  const clearSelection = () => {
    setSearchTerm('');
    onUserSelect(null);
    setIsDropdownOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'suspended': return 'text-yellow-400';
      case 'banned': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FaCheck className="text-green-400" />;
      case 'suspended': return <FaClock className="text-yellow-400" />;
      case 'banned': return <FaTimes className="text-red-400" />;
      default: return <FaUser className="text-gray-400" />;
    }
  };

  return (
    <div className="relative">
      {/* Campo de búsqueda */}
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
        <input
          ref={searchRef}
          type="text"
          placeholder={placeholder}
          value={selectedUser ? `@${selectedUser.username}` : searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
            if (selectedUser && e.target.value !== `@${selectedUser.username}`) {
              onUserSelect(null);
            }
          }}
          onFocus={() => setIsDropdownOpen(true)}
          className="w-full pl-10 pr-12 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
        />
        
        {/* Loading spinner o botón de limpiar */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {loading ? (
            <FaSpinner className="text-gray-500 animate-spin" />
          ) : selectedUser ? (
            <button
              onClick={clearSelection}
              className="text-gray-400 hover:text-white transition"
            >
              <FaTimes />
            </button>
          ) : (
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-400 hover:text-white transition"
            >
              <FaChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Filtros avanzados */}
      {showFilters && (
        <div className="mt-2">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
          >
            <FaFilter />
            Filtros avanzados
            <FaChevronDown className={`transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 p-3 bg-gray-800 rounded-lg">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Estado</label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      className="w-full bg-gray-700 text-white text-sm rounded px-2 py-1"
                    >
                      <option value="all">Todos</option>
                      <option value="active">Activo</option>
                      <option value="suspended">Suspendido</option>
                      <option value="banned">Baneado</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Rake mín.</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={filters.minRake}
                      onChange={(e) => setFilters({ ...filters, minRake: e.target.value })}
                      className="w-full bg-gray-700 text-white text-sm rounded px-2 py-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Rake máx.</label>
                    <input
                      type="number"
                      placeholder="∞"
                      value={filters.maxRake}
                      onChange={(e) => setFilters({ ...filters, maxRake: e.target.value })}
                      className="w-full bg-gray-700 text-white text-sm rounded px-2 py-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Con bonos</label>
                    <select
                      value={filters.hasBonuses}
                      onChange={(e) => setFilters({ ...filters, hasBonuses: e.target.value })}
                      className="w-full bg-gray-700 text-white text-sm rounded px-2 py-1"
                    >
                      <option value="all">Todos</option>
                      <option value="yes">Sí</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Dropdown de resultados */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl max-h-80 overflow-y-auto"
          >
            {/* Header de resultados */}
            <div className="p-3 border-b border-gray-700 bg-gray-750 rounded-t-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''}
                  {searchTerm && ` para "${searchTerm}"`}
                </span>
                {showAdvancedFilters && Object.values(filters).some(f => f && f !== 'all') && (
                  <button
                    onClick={() => setFilters({ status: 'all', minRake: '', maxRake: '', hasBonuses: 'all' })}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>

            {/* Lista de usuarios */}
            <div className="max-h-64 overflow-y-auto">
              {filteredResults.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" />
                      Buscando...
                    </div>
                  ) : (
                    <div>
                      <FaUser className="mx-auto mb-2 text-2xl" />
                      No se encontraron usuarios
                    </div>
                  )}
                </div>
              ) : (
                filteredResults.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => handleUserSelect(user)}
                    className={`p-3 border-b border-gray-700 last:border-b-0 hover:bg-gray-700 cursor-pointer transition-colors ${
                      selectedUser?.id === user.id ? 'bg-gray-700 border-l-4 border-l-poker-gold' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(user.status)}
                          <div>
                            <p className="font-semibold text-white">@{user.username}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      {showStats && (
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <FaDollarSign className="text-blue-400 text-xs" />
                              <span className="text-blue-400">S/{user.total_rake?.toFixed(2) || '0.00'}</span>
                            </div>
                            {user.bonus_amount > 0 && (
                              <div className="flex items-center gap-1">
                                <FaPercent className="text-green-400 text-xs" />
                                <span className="text-green-400">S/{user.bonus_released?.toFixed(2) || '0.00'}</span>
                              </div>
                            )}
                          </div>
                          <div className={`px-2 py-1 rounded text-xs ${getStatusColor(user.status)}`}>
                            {user.status || 'active'}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedUserSearch;