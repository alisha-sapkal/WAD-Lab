import { useState } from 'react'
import './App.css'

function App() {
  const [greeting] = useState('Hello World')

  return (
    <div className="app-container">
      <div className="greeting-card">
        <h1>{greeting}</h1>
        <p>Welcome to React!</p>
      </div>
    </div>
  )
}

export default App
