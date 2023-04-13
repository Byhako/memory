import { useState } from 'react'
import './styles.css'


export default function ConfigSecuence({ saveConfig }) {

  const [drums, setDrums] = useState('')

  const handleClick = () => {
    if (drums && drums !== 0) {
      saveConfig(drums)
    }
  }

  return (
    <section className="config_secuence">
      <h1>Train Your Memory</h1>

      <label htmlFor="drums">Number of drums</label>
      <input
        type="number"
        id="drums"
        value={drums}
        onChange={(e) => setDrums(e.target.value)}
      />
      <button 
        type='button'
        className={drums !== '' && drums !== '0' ? 'activate' : 'deactivate'}
        onClick={handleClick}
      >Play</button>
    </section>
  )
}