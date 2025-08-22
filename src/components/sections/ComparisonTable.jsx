const ComparisonTable = () => {
  const data = [
    { sala: 'X-POKER', principiante: '⭐⭐⭐', rakeback: '40%', deposito: '$20' },
    { sala: 'PPPOKER', principiante: '⭐⭐⭐⭐⭐', rakeback: '35-50%', deposito: '$10' },
    { sala: 'SUPREMA', principiante: '⭐⭐', rakeback: '60%', deposito: '$50' },
    { sala: 'WPT', principiante: '⭐⭐⭐', rakeback: 'Variable', deposito: '$100' },
    { sala: 'QQPK', principiante: '⭐⭐⭐⭐', rakeback: 'Especial', deposito: '$10' }
  ]
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-poker-gold">
        ¿CUÁL SALA ES PARA TI?
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead className="bg-poker-gold text-black">
            <tr>
              <th className="px-6 py-4 text-left">Sala</th>
              <th className="px-6 py-4 text-center">Principiantes</th>
              <th className="px-6 py-4 text-center">Rakeback</th>
              <th className="px-6 py-4 text-center">Depósito Min</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-t border-gray-800 hover:bg-gray-800">
                <td className="px-6 py-4 font-bold">{row.sala}</td>
                <td className="px-6 py-4 text-center">{row.principiante}</td>
                <td className="px-6 py-4 text-center text-poker-green font-bold">{row.rakeback}</td>
                <td className="px-6 py-4 text-center">{row.deposito}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="text-center mt-8">
        <a 
          href={`https://wa.me/59170000000?text=${encodeURIComponent('No estoy seguro qué sala elegir, necesito asesoría')}`}
          className="inline-block bg-whatsapp hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
        >
          NECESITO ASESORÍA →
        </a>
      </div>
    </div>
  )
}

export default ComparisonTable