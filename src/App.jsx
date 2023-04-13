import { useState } from 'react'
import GameSecuence from './view/GameSecuence'
import ConfigSecuence from './view/ConfigSecuence'
import './App.css'

function App() {
  const [state, setState] = useState('config')

  const saveConfig = (data) => {
    console.log(data)
  }

  const newConfig = () => {
    setState('config')
  }

  return (
    <div className="app">
      {state === 'config' ? (
        <ConfigSecuence saveConfig={saveConfig} />
      ) : (
        <GameSecuence newConfig={newConfig} />
      )}
    </div>
  )
}

export default App
