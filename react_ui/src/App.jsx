import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='h-screen w-screen bg-black'>
      <p className='text-white text-2xl' >Test</p>
    </main>
  )
}

export default App
