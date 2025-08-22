import { FaWhatsapp, FaTelegram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info */}
          <div>
            <h3 className="text-poker-gold font-bold text-xl mb-4">POKER AGENCY</h3>
            <p className="text-gray-400">
              Tu agente de confianza para las mejores salas de poker online.
              Rakeback garantizado y pagos puntuales.
            </p>
          </div>
          
          {/* Contacto */}
          <div>
            <h3 className="text-poker-gold font-bold text-xl mb-4">CONTACTO</h3>
            <div className="space-y-2">
              <a href="https://wa.me/59170000000" className="flex items-center text-gray-400 hover:text-whatsapp">
                <FaWhatsapp className="mr-2" /> WhatsApp
              </a>
              <a href="#" className="flex items-center text-gray-400 hover:text-blue-400">
                <FaTelegram className="mr-2" /> Telegram
              </a>
              <a href="mailto:info@pokeragency.com" className="flex items-center text-gray-400 hover:text-poker-gold">
                <FaEnvelope className="mr-2" /> Email
              </a>
            </div>
          </div>
          
          {/* Horarios */}
          <div>
            <h3 className="text-poker-gold font-bold text-xl mb-4">HORARIOS</h3>
            <p className="text-gray-400">Atención 24/7</p>
            <p className="text-gray-400">Pagos: Lunes a Domingo</p>
            <p className="text-gray-400">Soporte: Todo el día</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">© 2024 Poker Agency. Todos los derechos reservados.</p>
          <p className="text-gray-500 mt-2">Juega responsablemente +18</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer