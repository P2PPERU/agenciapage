import WhatsAppButton from './components/ui/WhatsAppButton'
import SalaCard from './components/ui/SalaCard'
import HeroSection from './components/sections/HeroSection'
import ComparisonTable from './components/sections/ComparisonTable'
import RakeCalculator from './components/sections/RakeCalculator'
import Footer from './components/layout/Footer'
import { salas } from './data/salas'

function App() {
  return (
    <div className="min-h-screen bg-poker-black text-white">
      {/* WhatsApp Flotante */}
      <WhatsAppButton />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Grid de Salas */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-poker-gold">
          NUESTRAS SALAS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salas.map((sala, index) => (
            <SalaCard key={sala.id} sala={sala} index={index} />
          ))}
        </div>
      </div>
      
      {/* Calculadora de Rakeback */}
      <RakeCalculator />
      
      {/* Tabla Comparativa */}
      <ComparisonTable />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App