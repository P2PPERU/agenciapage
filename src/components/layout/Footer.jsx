import { FaWhatsapp, FaTelegram, FaEnvelope, FaMapMarkerAlt, FaChartBar } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info */}
          <div>
            <h3 className="text-poker-gold font-bold text-xl mb-4 flex items-center">
              <FaChartBar className="mr-2" />
              POKER PRO TRACK
            </h3>
            <p className="text-gray-400">
              Tu buscador de rentabilidad en el poker. Compara rakeback, bonos y encuentra la sala perfecta para tu nivel.
            </p>
          </div>
          
          {/* Contacto */}
          <div>
            <h3 className="text-poker-gold font-bold text-xl mb-4">CONTACTO</h3>
            <div className="space-y-2">
              <a href="https://wa.me/51955311839" className="flex items-center text-gray-400 hover:text-whatsapp">
                <FaWhatsapp className="mr-2" /> WhatsApp
              </a>
              <a href="#" className="flex items-center text-gray-400 hover:text-blue-400">
                <FaTelegram className="mr-2" /> Telegram
              </a>
              <a href="mailto:info@pokerprotrack.com" className="flex items-center text-gray-400 hover:text-poker-gold">
                <FaEnvelope className="mr-2" /> Email
              </a>
            </div>
          </div>
          
          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-poker-gold font-bold text-xl mb-4">ENLACES RÁPIDOS</h3>
            <div className="space-y-2">
              <a href="#salas" className="block text-gray-400 hover:text-poker-gold">
                Comparar Salas
              </a>
              <a href="#comparador" className="block text-gray-400 hover:text-poker-gold">
                Calculadora Rakeback
              </a>
              <a href="/noticias" className="block text-gray-400 hover:text-poker-gold">
                Noticias
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">© 2024 Poker Pro Track. Todos los derechos reservados.</p>
          <p className="text-gray-500 mt-2">Tu comparador independiente de salas de poker online</p>
          <p className="text-gray-500 mt-2">Juega responsablemente +18</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer