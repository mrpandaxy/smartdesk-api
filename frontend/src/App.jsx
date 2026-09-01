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

  const handleDelete = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este chamado?")) {
      return;
    }

    axios.delete(`http://localhost:8000/api/tickets/${id}/`)
      .then(response => {
        setTickets(tickets.filter(ticket => ticket.id !== id));
      })
      .catch(error => {
        console.error("Erro ao excluir o chamado:", error);
        alert("Falha ao comunicar com o servidor para exclusão.");
      });
  }   
  const handleResolve = (id) => {
    axios.patch(`http://localhost:8000/api/tickets/${id}/`, { status: 'RESOLVIDO' })
      .then(response => {
        // Mapeia a lista atual e atualiza apenas o status do chamado clicado
        setTickets(tickets.map(ticket => 
          ticket.id === id ? { ...ticket, status: 'RESOLVIDO' } : ticket
        ));
      })
      .catch(error => {
        console.error("Erro ao resolver o chamado:", error);
        alert("Falha ao atualizar o status no servidor.");
      });
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SmartDesk - Meus Chamados</h1>

      <div style={{ backgroundColor: '#f4f4f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
        <h2>Abrir Novo Chamado</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Resumo do problema (ex: Teclado parou de funcionar)" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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

           {ticket.ai_summary && (
              <div style={{ backgroundColor: '#f0f4f8', padding: '10px', borderRadius: '5px', marginTop: '10px', borderLeft: '4px solid #8E75B2' }}>
                <strong>🤖 Diagnóstico da IA:</strong> {ticket.ai_summary}
              </div>
            )}
            
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              {ticket.status !== 'RESOLVIDO' && (
                <button 
                  onClick={() => handleResolve(ticket.id)}
                  style={{ padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ✅ Resolver
                </button>
              )}

              <button 
                onClick={() => handleDelete(ticket.id)}
                style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                🗑️ Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App