import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppButton = ({ message = "Hola, quiero información sobre las salas de poker" }) => {
  const whatsappNumber = "51955311839" // CAMBIA ESTO POR TU NÚMERO
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

export default WhatsAppButton