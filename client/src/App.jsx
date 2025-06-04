import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [professors, setProfessors] = useState([])
  const [selectedProfessor, setSelectedProfessor] = useState(null)
  const [comment, setComment] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/api/professors/')
      .then(response => setProfessors(response.data))
      .catch(error => console.error(error))
  }, [])

  const handleVote = () => {
    axios.post('http://localhost:8000/api/votes/', {
      professor: selectedProfessor,
      comment: comment,
      ip_address: '127.0.0.1' // remplace plus tard par une vraie IP côté backend si besoin
    })
    .then(() => alert('Vote enregistré !'))
    .catch(err => console.error(err))
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Vote pour le meilleur professeur 🎓</h1>
      <ul>
        {professors.map(p => (
          <li key={p.id}>
            <strong>{p.name}</strong><br />
            <em>{p.description}</em><br />
            <button onClick={() => setSelectedProfessor(p.id)}>
              Voter pour {p.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedProfessor && (
        <div style={{ marginTop: '1rem' }}>
          <textarea
            placeholder="Laissez un commentaire (optionnel)"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <br />
          <button onClick={handleVote}>Valider mon vote</button>
        </div>
      )}
    </div>
  )
}

export default App
