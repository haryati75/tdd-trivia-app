import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + ReactTS + Vitest + Playwright</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {
        count > 3 && (
          <p className="message">You've clicked the button more than 3 times!</p>
        )
      }
    </>
  )
}

export default App
