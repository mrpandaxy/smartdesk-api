import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  
  const [tickets, setTickets] = useState([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('OUTROS')

  useEffect(() => {
    axios.get('http://localhost:8000/api/tickets/')
      .then(response => {
        setTickets(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar os chamados:", error)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newTicket = {
      title: title,
      description: description,
      category: category,
      status: 'ABERTO' 
    }

    axios.post('http://localhost:8000/api/tickets/', newTicket)
      .then(response => {
       
        setTickets([...tickets, response.data])
        
        setTitle('')
        setDescription('')
        setCategory('OUTROS')
      })
      .catch(error => {
        console.error("Erro ao criar chamado:", error)
      })
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SmartDesk - Meus Chamados</h1>

      {/* A interface do Formulário */}
      <div style={{ backgroundColor: '#f4f4f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
        <h2>Abrir Novo Chamado</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Resumo do problema (ex: Teclado parou de funcionar)" 
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Atualiza a variável enquanto o usuário digita
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="BUG">Bug ou Falha</option>
            <option value="DUVIDA">Dúvida</option>
            <option value="HARDWARE">Problema de Hardware</option>
            <option value="OUTROS">Outros</option>
          </select>

          <textarea 
            placeholder="Descreva os detalhes e tentativas de solução..." 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <button type="submit" style={{ padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Salvar Chamado
          </button>
        </form>
      </div>
      
      {/* A Lista de Chamados */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {tickets.map(ticket => (
          <div key={ticket.id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>#{ticket.id} - {ticket.title}</h3>
            <span style={{ backgroundColor: '#eee', padding: '5px 10px', borderRadius: '15px', fontSize: '14px', marginRight: '10px' }}>
              Status: <strong>{ticket.status}</strong>
            </span>
            <span style={{ backgroundColor: '#eee', padding: '5px 10px', borderRadius: '15px', fontSize: '14px' }}>
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