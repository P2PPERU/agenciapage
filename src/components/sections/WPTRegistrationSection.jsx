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
    navigator.clipboard.writeText(text)
    // Opcional: mostrar notificación de que se copió
  }

  return (
    <motion.div
      key="registro"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Header con branding PERU EV+ */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          🎉 JUEGA EN WPT GLOBAL CON PERU EV+ 🎉
        </h2>
        <p className="text-xl text-gray-300">
          Registro paso a paso con códigos exclusivos y bonos especiales
        </p>
      </div>

      {/* Pasos de registro */}
      <div className="max-w-4xl mx-auto">
        {registrationSteps.map((step, idx) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex gap-6 items-start mb-8"
          >
            <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-yellow-500 to-transparent"></div>
            
            <div className="flex-1 bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-2xl">
                  {React.createElement(iconMap[step.iconName])}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Paso {step.step}: {step.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{step.description}</p>
                  
                  {step.highlight && (
                    <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-3 mb-4">
                      <p className="text-yellow-400 font-semibold">{step.highlight}</p>
                    </div>
                  )}

                  {/* Descargas para Step 1 */}
                  {step.downloads && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {step.downloads.map((download, i) => (
                        <a
                          key={i}
                          href={download.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-black/30 hover:bg-black/50 p-3 rounded-lg transition"
                        >
                          <span className="text-2xl">{download.icon}</span>
                          <span className="text-white font-semibold">{download.platform}</span>
                          <FaExternalLinkAlt className="text-gray-400 text-sm ml-auto" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Códigos para Step 4 */}
                  {step.codes && (
                    <div className="space-y-3 mb-4">
                      <div className="bg-black/40 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-yellow-400 font-semibold">🔑 Código de Invitado:</label>
                          <button
                            onClick={() => copyToClipboard(step.codes.invitado)}
                            className="text-gray-400 hover:text-white"
                            title="Copiar código"
                          >
                            <FaCopy />
                          </button>
                        </div>
                        <div className="text-3xl font-black text-white bg-gray-800 rounded p-3 text-center">
                          {step.codes.invitado}
                        </div>
                      </div>
                      
                      <div className="bg-black/40 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-purple-400 font-semibold">💎 Código de Bonificación:</label>
                          <button
                            onClick={() => copyToClipboard(step.codes.bonificacion)}
                            className="text-gray-400 hover:text-white"
                            title="Copiar código"
                          >
                            <FaCopy />
                          </button>
                        </div>
                        <div className="text-3xl font-black text-white bg-gray-800 rounded p-3 text-center">
                          {step.codes.bonificacion}
                        </div>
                      </div>
                      
                      <div className="bg-green-500/20 border border-green-500 rounded-lg p-3">
                        <p className="text-green-400 text-sm">
                          💵 Con estos códigos obtendrás saldo extra para empezar y bonificaciones especiales
                        </p>
                      </div>
                    </div>
                  )}

                  {/* WhatsApp help para último paso */}
                  {step.whatsapp && (
                    <a
                      href={`https://${step.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                    >
                      <FaWhatsapp className="mr-2" />
                      Ayuda con el registro
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Promociones Exclusivas */}
      {promosPeru && (
        <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500 rounded-2xl p-8 mt-12">
          <h3 className="text-2xl font-bold text-center mb-6">
            {promosPeru.title}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {promosPeru.freerolls.map((freeroll, idx) => (
              <div key={idx} className="bg-black/30 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">{freeroll.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{freeroll.name}</h4>
                <p className="text-yellow-400 font-semibold mb-2">{freeroll.prize}</p>
                <p className="text-gray-400">{freeroll.frequency}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a
              href={`https://${promosPeru.whatsappHelp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 text-white font-bold px-6 py-3 rounded-full hover:bg-green-600 transition text-lg"
            >
              <FaWhatsapp className="mr-3" />
              Obtener Ayuda para Registro
            </a>
          </div>
        </div>
      )}

      {/* Nota importante */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500 rounded-2xl p-6 mt-8">
        <h3 className="text-xl font-bold text-blue-400 mb-3 flex items-center">
          <FaShieldAlt className="mr-3" />
          Importante Recordar
        </h3>
        <ul className="text-gray-300 space-y-2">
          <li className="flex items-start gap-2">
            <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
            <span>Selecciona <strong>Andorra</strong> como país, no Perú</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
            <span>Usa tus datos reales (solo cambia el país)</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
            <span>Guarda los códigos: <strong>8288C1</strong> y <strong>PeruEV</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
            <span>Escríbenos para ayuda personalizada</span>
          </li>
        </ul>
      </div>
    </motion.div>
  )
}

export default WPTRegistrationSection