import { useState } from 'react';
import './App.css'
import TodoAppComponent from './components/TodoAppComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <TodoAppComponent></TodoAppComponent>        
      </div>
      <p className="read-the-docs">
      </p>
    </>
  )
}

export default App
