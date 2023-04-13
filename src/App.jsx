import { useState } from 'react'
import GameSecuence from './view/GameSecuence'
import ConfigSecuence from './view/ConfigSecuence'
import './App.css'

function App() {
  const [state, setState] = useState('7')

  const saveConfig = (data) => {
    setState(data)
  }

  const newConfig = () => {
    setState('config')
  }

  return (
    <div className="app">
      {state === 'config' ? (
        <ConfigSecuence saveConfig={saveConfig} />
      ) : (
        <GameSecuence newConfig={newConfig} numberDrums={state} />
      )}
    </div>
  )
}

export default App
