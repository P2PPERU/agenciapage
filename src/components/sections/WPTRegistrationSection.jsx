// src/components/sections/WPTRegistrationSection.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaWhatsapp, 
  FaDownload, 
  FaUserPlus, 
  FaShieldAlt, 
  FaDollarSign,
  FaGlobeAmericas,
  FaKey,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaCopy,
  FaTrophy,
  FaGift
} from 'react-icons/fa'

const iconMap = {
  FaWhatsapp: FaWhatsapp,
  FaDownload: FaDownload,
  FaUserPlus: FaUserPlus,
  FaShieldAlt: FaShieldAlt,
  FaDollarSign: FaDollarSign,
  FaGlobeAmericas: FaGlobeAmericas,
  FaKey: FaKey,
  FaCheckCircle: FaCheckCircle
}

const WPTRegistrationSection = ({ registrationSteps, promosPeru }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Mostrar notificación temporal
      const notification = document.createElement('div')
      notification.textContent = `✓ Código ${text} copiado!`
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      `
      document.body.appendChild(notification)
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 2000)
    })
  }

  return (
    <motion.div
      key="registro"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header con branding PERU EV+ */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🎉 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-red-400">
              JUEGA EN WPT GLOBAL
            </span> 🎉
          </h2>
          <div className="inline-block bg-gradient-to-r from-poker-gold/20 to-orange-500/20 border border-poker-gold rounded-full px-6 py-2">
            <span className="text-poker-gold font-bold">CON PERU EV+ Y ESCUELA POKER</span>
          </div>
        </motion.div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Registro paso a paso con códigos exclusivos y bonos especiales. 
          <span className="text-poker-gold font-semibold"> ¡Asistencia personalizada garantizada!</span>
        </p>
      </div>

      {/* Pasos de registro */}
      <div className="space-y-8">
        {registrationSteps.map((step, idx) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            className="relative"
          >
            {/* Línea conectora */}
            {idx < registrationSteps.length - 1 && (
              <div className="absolute left-8 top-24 w-0.5 h-20 bg-gradient-to-b from-poker-gold to-transparent z-0"></div>
            )}
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border border-gray-800 hover:border-poker-gold/30 transition-all duration-300 relative z-10">
              <div className="flex flex-col lg:flex-row items-start gap-6">
                {/* Número y icono del paso */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {React.createElement(iconMap[step.iconName])}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-poker-gold text-black rounded-full flex items-center justify-center text-sm font-black">
                      {step.step}
                    </div>
                  </div>
                </div>
                
                {/* Contenido del paso */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Paso {step.step}: {step.title}
                    </h3>
                    <p className="text-gray-400 text-lg">{step.description}</p>
                  </div>
                  
                  {/* Highlight especial */}
                  {step.highlight && (
                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl p-4 mb-6">
                      <p className="text-yellow-400 font-bold flex items-center">
                        <span className="text-2xl mr-3">⚠️</span>
                        {step.highlight}
                      </p>
                    </div>
                  )}

                  {/* Descargas para Step 1 */}
                  {step.downloads && (
                    <div className="mb-6">
                      <h4 className="text-white font-bold mb-4 flex items-center">
                        <FaDownload className="mr-2 text-poker-gold" />
                        Selecciona tu plataforma:
                      </h4>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {step.downloads.map((download, i) => (
                          <motion.a
                            key={i}
                            href={download.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group bg-gray-800 hover:bg-gray-700 p-4 rounded-xl transition-all duration-300 border border-gray-700 hover:border-poker-gold"
                          >
                            <div className="text-center">
                              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                                {download.icon}
                              </div>
                              <span className="text-white font-semibold block">{download.platform}</span>
                              <FaExternalLinkAlt className="text-gray-400 text-xs mx-auto mt-2 group-hover:text-poker-gold transition-colors" />
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Códigos para Step 4 */}
                  {step.codes && (
                    <div className="mb-6">
                      <h4 className="text-white font-bold mb-4 flex items-center">
                        <FaKey className="mr-2 text-poker-gold" />
                        Códigos Exclusivos (¡ORDEN IMPORTANTE!):
                      </h4>
                      <div className="space-y-4">
                        {/* Código de Bonificación PRIMERO */}
                        <div className="bg-gradient-to-r from-purple-500/20 to-purple-700/20 border border-purple-500 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-3">
                            <label className="text-purple-400 font-bold text-lg flex items-center">
                              <span className="text-2xl mr-2">💎</span>
                              1º - Código de Bonificación:
                            </label>
                            <button
                              onClick={() => copyToClipboard(step.codes.bonificacion)}
                              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                              title="Copiar código"
                            >
                              <FaCopy />
                              Copiar
                            </button>
                          </div>
                          <div className="bg-black/50 rounded-lg p-4 border border-purple-500/50">
                            <div className="text-4xl font-black text-white text-center tracking-wider">
                              {step.codes.bonificacion}
                            </div>
                          </div>
                        </div>
                        
                        {/* Código de Invitado SEGUNDO */}
                        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-3">
                            <label className="text-yellow-400 font-bold text-lg flex items-center">
                              <span className="text-2xl mr-2">🔑</span>
                              2º - Código de Invitado:
                            </label>
                            <button
                              onClick={() => copyToClipboard(step.codes.invitado)}
                              className="bg-yellow-600 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-bold"
                              title="Copiar código"
                            >
                              <FaCopy />
                              Copiar
                            </button>
                          </div>
                          <div className="bg-black/50 rounded-lg p-4 border border-yellow-500/50">
                            <div className="text-4xl font-black text-white text-center tracking-wider">
                              {step.codes.invitado}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-500/20 border border-green-500 rounded-lg p-4">
                          <p className="text-green-400 font-semibold flex items-center">
                            <span className="text-xl mr-2">💰</span>
                            Con estos códigos obtendrás bonificaciones especiales y saldo extra para empezar
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Datos personales para Step 5 */}
                  {step.personalData && (
                    <div className="mb-6">
                      <h4 className="text-white font-bold mb-4 flex items-center">
                        <FaUserPlus className="mr-2 text-poker-gold" />
                        Completa estos datos EXACTAMENTE:
                      </h4>
                      
                      <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500 rounded-xl p-6 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Nombre y Apellido */}
                          <div className="bg-black/30 rounded-lg p-4 border border-green-500/50">
                            <label className="text-green-400 font-bold block mb-2 flex items-center">
                              <span className="text-lg mr-2">✅</span>
                              Nombre y Apellido:
                            </label>
                            <p className="text-white font-bold text-lg">{step.personalData.nombre}</p>
                            <p className="text-green-300 text-sm mt-1">Usa tus datos reales y completos</p>
                          </div>
                          
                          {/* Dirección */}
                          <div className="bg-black/30 rounded-lg p-4 border border-green-500/50">
                            <label className="text-green-400 font-bold block mb-2 flex items-center">
                              <span className="text-lg mr-2">🏠</span>
                              Dirección:
                            </label>
                            <p className="text-white font-bold text-lg">{step.personalData.direccion}</p>
                            <p className="text-green-300 text-sm mt-1">Incluye calle y número real</p>
                          </div>
                          
                          {/* Teléfono */}
                          <div className="bg-black/30 rounded-lg p-4 border border-red-500/50">
                            <label className="text-red-400 font-bold block mb-2 flex items-center">
                              <span className="text-lg mr-2">📞</span>
                              Teléfono:
                            </label>
                            <p className="text-red-400 font-bold text-lg">{step.personalData.telefono}</p>
                            <p className="text-red-300 text-sm mt-1">¡MUY IMPORTANTE! No completar este campo</p>
                          </div>
                          
                          {/* Ciudad */}
                          <div className="bg-black/30 rounded-lg p-4 border border-green-500/50">
                            <label className="text-green-400 font-bold block mb-2 flex items-center">
                              <span className="text-lg mr-2">🏙️</span>
                              Ciudad:
                            </label>
                            <p className="text-white font-bold text-xl">{step.personalData.ciudad}</p>
                            <p className="text-green-300 text-sm mt-1">Obligatorio: Lima</p>
                          </div>
                          
                          {/* Código Postal */}
                          <div className="bg-black/30 rounded-lg p-4 border border-green-500/50 md:col-span-2">
                            <label className="text-green-400 font-bold block mb-2 flex items-center">
                              <span className="text-lg mr-2">📮</span>
                              Código Postal:
                            </label>
                            <p className="text-white font-bold text-3xl">{step.personalData.codigoPostal}</p>
                            <p className="text-green-300 text-sm mt-1">Código postal estándar para Lima</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500 rounded-lg p-4">
                        <p className="text-orange-400 font-semibold flex items-start">
                          <span className="text-xl mr-2 mt-0.5">⚠️</span>
                          <span>
                            <strong>CRÍTICO:</strong> Usa tus datos personales reales (excepto país = Andorra). 
                            Esto es obligatorio para verificar tu cuenta y procesar retiros de ganancias.
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* WhatsApp help */}
                  {step.whatsapp && (
                    <div className="pt-4 border-t border-gray-800">
                      <a
                        href={`https://${step.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
                      >
                        <FaWhatsapp className="mr-2 text-lg" />
                        Ayuda Personalizada con el Registro
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Promociones Exclusivas */}
      {promosPeru && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500 rounded-3xl p-8"
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-white">
            {promosPeru.title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {promosPeru.freerolls.map((freeroll, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-black/30 backdrop-blur rounded-2xl p-8 text-center border border-yellow-500/30 hover:border-yellow-500/60 transition-colors"
              >
                <div className="text-6xl mb-4">{freeroll.icon}</div>
                <h4 className="text-2xl font-bold text-white mb-3">{freeroll.name}</h4>
                <p className="text-yellow-400 font-bold text-xl mb-2">{freeroll.prize}</p>
                <p className="text-gray-300 text-lg">{freeroll.frequency}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <a
              href={`https://${promosPeru.whatsappHelp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform text-xl shadow-xl"
            >
              <FaWhatsapp className="mr-3 text-2xl" />
              Obtener Ayuda Completa para Registro
            </a>
          </div>
        </motion.div>
      )}

      {/* Resumen final con datos importantes */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500 rounded-3xl p-8"
      >
        <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center justify-center">
          <FaShieldAlt className="mr-3 text-3xl" />
          RESUMEN: Datos Clave para el Registro
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
              <div>
                <strong className="text-white">País:</strong>
                <br />Selecciona <span className="text-yellow-400 font-bold">ANDORRA</span> (no Perú)
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
              <div>
                <strong className="text-white">Códigos (en orden):</strong>
                <br />1º: <span className="text-purple-400 font-bold">PeruEV</span>
                <br />2º: <span className="text-yellow-400 font-bold">8288C1</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
              <div>
                <strong className="text-white">Datos personales:</strong>
                <br />Usa tus <span className="text-green-400 font-bold">datos reales</span> (nombre, dirección)
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
              <div>
                <strong className="text-white">Ciudad:</strong>
                <br /><span className="text-yellow-400 font-bold">LIMA</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
              <div>
                <strong className="text-white">Código Postal:</strong>
                <br /><span className="text-yellow-400 font-bold">00051</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-red-400 mt-1 flex-shrink-0" />
              <div>
                <strong className="text-white">Teléfono:</strong>
                <br /><span className="text-red-400 font-bold">DEJAR VACÍO</span> (muy importante)
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            ¿Tienes dudas o necesitas ayuda con algún paso? 👇
          </p>
          <a
            href="https://wa.me/51955311839?text=Necesito%20ayuda%20paso%20a%20paso%20para%20registrarme%20en%20WPT%20Global"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            <FaWhatsapp className="mr-2" />
            Ayuda Inmediata por WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default WPTRegistrationSection