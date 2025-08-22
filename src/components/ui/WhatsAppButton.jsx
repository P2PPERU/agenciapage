import { useState, useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  
  // Usar variable de entorno o número por defecto
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "51955311839"
  
  // Mensajes rotativos para hacer el botón más dinámico
  const messages = [
    "Hola, quiero información sobre las salas de poker",
    "Quiero empezar a ganar con rakeback",
    "Necesito ayuda para elegir una sala",
    "Información sobre bonos y promociones"
  ]
  
  const defaultMessage = messages[messageCount % messages.length]
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`
  
  // Mostrar tooltip después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 5000)
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Cambiar mensaje cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageCount(prev => prev + 1)
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Efecto de vibración ocasional
  useEffect(() => {
    const vibrateInterval = setInterval(() => {
      const button = document.getElementById('whatsapp-float-btn')
      if (button) {
        button.classList.add('vibrate')
        setTimeout(() => button.classList.remove('vibrate'), 1000)
      }
    }, 15000)
    
    return () => clearInterval(vibrateInterval)
  }, [])
  
  return (
    <>
      <style>
        {`
          @keyframes vibrate {
            0% { transform: rotate(0deg); }
            10% { transform: rotate(-5deg); }
            20% { transform: rotate(5deg); }
            30% { transform: rotate(-5deg); }
            40% { transform: rotate(5deg); }
            50% { transform: rotate(-5deg); }
            60% { transform: rotate(5deg); }
            70% { transform: rotate(-5deg); }
            80% { transform: rotate(5deg); }
            90% { transform: rotate(-5deg); }
            100% { transform: rotate(0deg); }
          }
          
          .vibrate {
            animation: vibrate 1s ease-in-out;
          }
          
          @keyframes pulse-ring {
            0% {
              transform: scale(0.8);
              opacity: 1;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          
          .pulse-ring {
            animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}
      </style>
      
      <div className="fixed bottom-6 right-6 z-50">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: 0 }}
              className="absolute bottom-0 right-full mr-4 mb-3 whitespace-nowrap"
            >
              <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl relative">
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900"></div>
                <p className="text-sm font-semibold">💬 ¿Necesitas ayuda?</p>
                <p className="text-xs text-gray-300">Estamos en línea ahora</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Anillo de pulso */}
        <div className="absolute inset-0 rounded-full bg-whatsapp opacity-25 pulse-ring"></div>
        
        {/* Botón principal */}
        <motion.a
          id="whatsapp-float-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-whatsapp to-green-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Icono */}
          <FaWhatsapp className="text-3xl group-hover:rotate-12 transition-transform duration-300" />
          
          {/* Badge de "En línea" */}
          <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping"></span>
          </span>
        </motion.a>
        
        {/* Texto flotante opcional para móviles */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 md:hidden"
        >
          <span className="bg-black/75 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
            Toca para chatear
          </span>
        </motion.div>
      </div>
    </>
  )
}

// Versión alternativa más simple (opcional)
export const WhatsAppButtonSimple = ({ message = "Hola, necesito información" }) => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "51955311839"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  
  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-whatsapp hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-50 animate-pulse"
    >
      <FaWhatsapp size={30} />
    </a>
  )
}

// Botón de WhatsApp para CTAs inline (no flotante)
export const WhatsAppCTA = ({ 
  message = "Quiero empezar a jugar", 
  text = "CONTACTAR AHORA",
  showIcon = true,
  variant = "primary",
  size = "lg",
  fullWidth = false
}) => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "51955311839"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  
  const variants = {
    primary: "bg-gradient-to-r from-whatsapp to-green-600 text-white hover:from-green-600 hover:to-green-700",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    gold: "bg-gradient-to-r from-poker-gold to-yellow-500 text-black hover:from-yellow-500 hover:to-poker-gold",
    outline: "border-2 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  }
  
  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center justify-center font-bold rounded-full
        transition-all duration-300 transform hover:scale-105
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {showIcon && <FaWhatsapp className="mr-2 text-xl" />}
      {text}
    </motion.a>
  )
}

export default WhatsAppButton