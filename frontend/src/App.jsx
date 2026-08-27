import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [tickets, setTickets] = useState([])

  useEffect(() => {
    
    axios.get('http://localhost:8000/api/tickets/')
      .then(response => {
        setTickets(response.data) 
      })
      .catch(error => {
        console.error("Erro ao buscar os chamados:", error)
      })
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>SmartDesk - Meus Chamados</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Aqui fazemos um 'for each' para desenhar cada chamado na tela */}
        {tickets.map(ticket => (
          <div key={ticket.id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>#{ticket.id} - {ticket.title}</h3>
            <span style={{ 
                backgroundColor: '#eee', 
                padding: '5px 10px', 
                borderRadius: '15px', 
                fontSize: '14px',
                marginRight: '10px'
              }}>
              Status: <strong>{ticket.status}</strong>
            </span>
            <span style={{ 
                backgroundColor: '#eee', 
                padding: '5px 10px', 
                borderRadius: '15px', 
                fontSize: '14px'
              }}>
              Categoria: <strong>{ticket.category}</strong>
            </span>
            <p style={{ marginTop: '15px' }}>{ticket.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App