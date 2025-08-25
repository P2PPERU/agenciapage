// src/components/sections/FAQsSection.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaWhatsapp } from 'react-icons/fa'

const FAQsSection = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: '¿Puedo depositar con YAPE o PLIN?',
      answer: 'Sí, todas nuestras salas aceptan YAPE y PLIN. Los depósitos se procesan en menos de 1 minuto y los retiros en máximo 24 horas.',
      whatsappText: 'Hola, quiero información sobre depósitos con YAPE/PLIN'
    },
    {
      question: '¿El rakeback del 65% es real?',
      answer: 'Totalmente real. PPPOKER ofrece hasta 65% de rakeback para jugadores VIP. Empiezas con 40% y va subiendo según tu volumen de juego.',
      whatsappText: 'Hola, quiero saber más sobre el 65% de rakeback'
    },
    {
      question: '¿Los freerolls de $10,000 son gratis?',
      answer: 'Sí, WPT ofrece freerolls de $10,000 TODOS LOS DÍAS completamente gratis para nuevos jugadores.',
      whatsappText: 'Hola, quiero participar en los freerolls de $10,000'
    }
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          PREGUNTAS <span className="text-poker-gold">FRECUENTES</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-700 transition"
              >
                <span className="text-white font-semibold text-left">{faq.question}</span>
                <FaChevronDown 
                  className={`text-poker-gold transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-400 mb-4">{faq.answer}</p>
                      <a
                        href={`https://wa.me/51955311839?text=${encodeURIComponent(faq.whatsappText)}`}
                        className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp className="mr-2" />
                        Preguntar por WhatsApp
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 mb-4">¿No encuentras tu pregunta?</p>
          <a
            href="https://wa.me/51955311839?text=Hola,%20tengo%20una%20consulta%20sobre%20poker%20online"
            className="inline-flex items-center bg-poker-gold text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-500 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="mr-2" />
            HACER OTRA PREGUNTA
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQsSection
